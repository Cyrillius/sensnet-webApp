/**
 * Copyright (c) Christopher Keefer. All Rights Reserved.
 *
 * Overrides the default transport for Backbone syncing to use websockets via socket.io. Includes marionette     
 * convenience code, specifically for sending socket-related events along the global event aggregator.
 */
(function(app, Backbone, Marionette, $, _, io){
    var urlError = function(){
        throw new Error('A "url" property or function must be specified.');
    },
        eventEmit = io.EventEmitter.prototype.emit,
        ajaxSync = Backbone.sync;

    /**
     * Preserve the standard, jquery ajax based persistance method as ajaxSync.
     */
    Backbone.ajaxSync = function(method, model, options){
        return ajaxSync.call(this, method, model, options);
    };
    
    /**
     * Replace the standard sync function with our new, websocket/socket.io based solution.
     */
    Backbone.sync = function(method, model, options){
        var opts = _.extend({}, options),
            defer = $.Deferred(),
            promise = defer.promise(),
            namespace,
            socket;

        opts.url = (opts.url) ? _.result(opts, 'url') : (model.url) ? _.result(model, 'url') : void 0;
        // If no url property has been specified, throw an error, as per the standard Backbone sync
        if (!opts.url) urlError();
        namespace = Backbone.Model.prototype.namespace.call(this, opts.url);
        // Determine what data we're sending, and ensure id is present if we're performing a PATCH call
        if (!opts.data && model) opts.data = opts.attrs || model.toJSON(options) || {};
        if ((opts.data.id === null || opts.data.id === void 0) && opts.patch === true && model){
            opts.data.id = model.id;
        }
        // Determine which websocket to use - set in options, on model, or on global app
        socket = opts.socket || model.socket || app.socket;
        // Trigger the app event aggregator for interested listeners to know we're about to request data via websocket
        app.vent.trigger('backbone:request', namespace);
        // Add a listener for our namespaced method, and resolve or reject our deferred based on the response
        socket.once(namespace+method, function(res){
            var success = (res && res.success);
            // Trigger the app event aggregator to indicate we've received a return from the server, and success
            app.vent.trigger('backbone:receive', namespace, success);
            if (success)
            {
                if (_.isFunction(options.success)) options.success(res);
                defer.resolve(res);
                return;
            }
            if (_.isFunction(options.error)) options.error(res);
            defer.reject(res);
        });

        // Emit our namespaced method and the model+opts data
        socket.emit(namespace+method, opts.data);

        // Trigger the request event on the model, as per backbone spec
        model.trigger('request', model, promise, opts);
        // Return the promise for us to use as per usual (hanging .done blocks off, add to a .when, etc.)
        return promise;
    };

    /**
     * Break url apart to create namespace - every '/' save any pre/post-fixing the url will become a ':' indicating
     * namespace - so a collection that maps to /api/posts will now have its events on the namespace
     * api:posts: (ie. api:posts:create, api:posts:delete, etc.), and a model that maps to /api/posts/21
     * will have events on api:posts:21: (ie. api:posts:21:update, api:posts:21:patch, etc.)
     * @param {string=} url
     */
    Backbone.Model.prototype.namespace = function(url){
        url = url || this.url();
        return _.trim(url, '/').replace('/', ':') + ":";
    };

    /**
     * Override EventEmitter.emit and SocketNamespace reference for socket.io to add a catch all case for the
     * wildcard ('*') character. Now, socket.on('*') will catch any event, with the name of the caught event
     * passed to the handler as the first argument.
    */
    io.EventEmitter.prototype.emit = function(name){
        var args = Array.prototype.slice.call(arguments, 1);

        eventEmit.apply(this, ['*', name].concat(args));
        eventEmit.apply(this, [name].concat(args));
    };
    io.SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

    /**
     * Create a socket io instance that will echo all events into the application event aggregator, so that
     * collections, models, etc. can listen on app.vent for their events.
     * @param {string=} url
     * @constructor
     */
    Marionette.Application.prototype.SocketIO = function(url){
        var socket = io.connect(url, {
            transports:['websocket']
        });

        /**
         * On any event from the server, trigger it on the app event aggregator. The first
         * argument will always be the name of the event.
         */
        socket.on('*', function(){
            var args = Array.prototype.slice.call(arguments, 0);
            app.vent.trigger(args[0], args.slice(1));
        });

        /**
         * On error, trigger the socket:error event on the global event aggregator for 
         * interested listeners.
         */
        socket.on('error', function(err){
            app.vent.trigger('socket:error', err);
        });

        return socket;
    }
})(app /* replace with your global app object */, Backbone, Backbone.Marionette, jQuery, _, io);
