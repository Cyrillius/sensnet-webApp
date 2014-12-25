# Sensnet Project 

  ### Information 

  A javascript web application used to manage a bluetooth low energy network. 

  This project is made by 4 students studying at the __University of Applied Science  Western Switzerland in Industrial System Engineering__

  This application used a websocket connection to communicate with a central Unit over internet and handle the events boadcasted by the system and display it in a webpage. 


  __Project Master:__

  - Medard Rieder


  __Contributor:__

  - Patrice Rudaz
  - Emilie Gsponer


  __Students:__

  - Lucien Aymon 
  - Samantha Niyoyita
  - Yann Maret
  - Cyril Praz


  ### Library Used

 |          Name               |          URL                     |       Description                                     |
 | :-------------------------- | :------------------------------- | :--------------------------------------------------   |
 |    twitter bootstrap        |   http://getbootstrap.com        |   html, css and js framework                          |
 |    jquery                   |   http://jquery.com              |   javascript library to modify the DOM                |
 |    backbone                 |   http://backbonejs.org/         |   javascipt framework to work with model              |
 |    backbone marionette      |   http://marionettejs.com/       |   common design and implementation patterns           |

  ### Required 

  #### to Use

  The libraries are already included into  the project, you need just have a modern browser supporting websocket. This project is tested with Google Chrome Version 39.0.2171.95 m and Firefox Version 34.0

  #### to Develop

  This project use some tools from Node.js platform as Grunt a great javascript task runner you need to install node.js on your computer (http://nodejs.org/)


  ### Installation 

  1. Clone the repository :  

  ```bash
  git clone https://cyrillius@bitbucket.org/cyrillius/sensnet.git 
  ```

  2. Select the development branch (if you want to contribute)

  ```bash
  git checkout dev
  ```  


 ### Getting Started 

 The main web page of the application is : `/sensnet/index.html`


 ### Grunt

Grunt is a javascript task runner (http://gruntjs.com/) . He is used into this project to generate sensnet.js and sensnet.min.js for the production. It also used to generate the documentation you are reading now.

#### Commands

to generate a sensnet.js with the annotation:

```
grunt dev
```

to generate a sensnet.min.js without the annotations and minified:

```
grunt prod
```
to generate the documentation:

```
grunt doc
```

#### customize

to add some tasks you can modify `/sensnet/js/app/Gruntfile.js`

### Network

In a standard websocket application we need a web server  to get the web page and a websocket server to handle the bidirectional communication but we can bind this servers because the websocket handshake is in http. Into this project we bind this servers to have a compact and light weight web/websocket server and now we will explain we did this.

#### Http

When we want to display the web page and type http://sensnet.tk/ into the browsers bar will send to the server some GET http request like this:
	
```
GET / HTTP/1.1
Host: sensnet.tk
Connection: keep-alive
Authorization: Basic cGdhOlJhd3lsLTQ3
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4
```
and the server answer with this header followed by the data (here the html code index.html)

```
HTTP/1.1 200 OK
Date: Wed, 24 Dec 2014 17:52:29 GMT
Server: Apache
Last-Modified: Sat, 20 Dec 2014 06:31:41 GMT
ETag: "f5183be-11cf-50a9ffa6bcd40"
Accept-Ranges: bytes
Content-Length: 4559
X-Powered-By: PleskLin
Keep-Alive: timeout=5, max=8
Connection: Keep-Alive
Content-Type: text/html
```
Then the browser will loading the page and notice that there is some in other file like the style of the webisite is in this adress:  http://sensnet.tk/css/custom.css.
He will send an other GET htttp request to have this file like here:

```
GET /sensnet-backbone/css/custom.css HTTP/1.1
Host: sensnet.tk
Connection: keep-alive
...

```

until the webpage is fully loaded.

#### Websocket


When the web page is fully loaded the browser will trig an event. This event will handle by a jquery and he will launch our javascript application.

When a websocket server is added into our application the browser will send another http request but with more fields like here:

```
GET ws://127.0.0.1:8080/ HTTP/1.1
Host: 127.0.0.1:8080
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Origin: http://sensnet.tk
Sec-WebSocket-Version: 13
User-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4
Sec-WebSocket-Key: cCbtf+IoLcpep0CNZ32OGQ==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

The web/websocket server will see there is a field "Upgrade: websocket" and he will calculate the Sec-WebSocket-Accept key  with "Sec-WebSocket-Key: cCbtf+IoLcpep0CNZ32OGQ=="

and upgrade his connection in tcp connection. (more info here: https://tools.ietf.org/html/rfc6455#section-4.2.1)

finally he will answer with this header:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: DBWf9sgEU91cTkIxR/MXN+5dBcg=
```

The connection is now upgraded and the client or the server can send a websocket frame. Here you can see how is look like the websocket frame https://tools.ietf.org/html/rfc6455#section-5.2 . 

There are two type of data frame:

- a binary websocket frame
- a text websocket frame

Now a lot of application use a text websocket frame with JSON encoding. With this combination we can easily transmit the informations we want and debug. But yes there are a lot of useless bytes.

In this project we use this to don't waste our time formatting data but maybe when we have some time we can translate this in binary.

####Events

Our project is an asynchrone system it's not a real time system and we work with an event queue.

Everything is broadcasted like this we are sure that everybody have the same content .

The list of events are :

- onInit
- onDeviceChange
- onSensorChange


####JSON

Here is some JSON messages that you need to send. You can send more, the informations will be save into the object because the constructor of the object use a json variable.

exemple: 

```Javascript
var device1 = new Device({"name":"My Device", "mac":"55: 44: 33: 22: 10"});
```

__an onInit message:__

```JSON
{
"event":"onInit",
"devices": [
    {
        "mac": "55: 44: 33: 22: 10",
        "sensors": [
            {
                "type": "temperature",
                "value": "20",
                "port": 0
            },
            {
                "type": "motion",
                "value": "0",
                "port": 1
            }
        ]
    },
    {
        "mac": "55: 44: 33: 22: 11",
        "sensors": [
            {
                "type": "temperature",
                "value": "20",
                "port": 0
            },
            {
                "type": "motion",
                "value": "0",
                "port": 1
            }
        ]
    },
    {
        "mac": "55: 44: 33: 22: 12",
        "sensors": [
            {
                "type": "temperature",
                "value": "20",
                "port": 0,
            },
            {
                "type": "motion",
                "value": "0",
                "port": 1
            }
        ]
    },
    {
        "mac": "55: 44: 33: 22: 13",
        "sensors": [
            {
                "type": "temperature",
                "value": "20",
                "port": 0
            },
            {
                "type": "motion",
                "value": "0",
                "port": 1
            }
        ]
    }
    ]
} 

```
__an onDeviceChange message:__

```JSON
{
"event":"onDeviceChange",
"device": 
	     {
        "mac": "55: 44: 33: 22: 1`0",
        "sensors": [
            {
                "type": "temperature",
                "value": "20",
                "port": 0
            },
            {
                "type": "motion",
                "value": "1",
                "port": 1
            }
        ]
    }
}
```
__an onSensorChange message:__

```JSON
{
"event":"onSensorChange",
"mac": "55: 44: 33: 22: 10", 
"sensor": {
    "type": "temperature",
    "value": "20",
    "port": 0
	}
}
```










