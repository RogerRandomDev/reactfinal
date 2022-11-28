const WebSocket = require('ws');
const {sendMessage} = require("../controllers/chat")
const chatServer = new WebSocket.Server({ port: 9099 });
const clients = new Map()
const {setInterval,clearInterval} = require('timers')
chatServer.on('connection', (ws,req,client) => {
    console.log(`request:${req}\nclient:${client}`)
    //need the metadata to hold the data of the client userID
    const body=JSON.parse(req.body)
    //value[0]=body.userID
    var metadata=[body.userID]
    clients.set(ws,metadata)
    
    //everything below is the events for the websocket
    //ensures the client still exists
    ws.on('pong',()=>{this.isAlive=true})

    //when the client leaves
    ws.on("close", () => {
        clients.delete(ws);
    });
    //whenever the client sends a message
    //should be sent as a json of {senderToken:token,targetID:id,aboutID:id,msg:message}
    const message=(data)=>{
        const {senderToken,targetID,aboutID,msg}=JSON.parse(data)
        const {userID}=decodeToken(senderToken)
        sendMessage(userID,targetID,aboutID,msg)
        console.log(`received: ${data}`)
        clients.forEach((client,value)=>{
            //refer to line 8-11
            if(targetID!=value[0]||client.readyState!==WebSocket.OPEN){return;}
            client.send(JSON.stringify({aboutID,msg}))
        })
    }
    //event handler
    ws.on('message',message(data))
    
})

//interval timer to clear any clients who can't connect
const interval = setInterval(()=> {
    clients.forEach((client,metadata)=>{
        //removes clients if they no longer are connected since the last ping
      if (client.isAlive === false){
        clients.delete(client);
        return client.terminate()
    }
        ;
  
      client.isAlive = false;
      client.ping();
    });
    //pings once per minute
  }, 60000);

  