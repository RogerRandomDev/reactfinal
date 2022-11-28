const WebSocket = require('ws');
const chatServer = new WebSocket.Server({ port: 9099 });
const clients = new Map()

chatServer.on('connection', (ws,req,client) => {
    console.log(`request:${req}\nclient:${client}`)
    //need the metadata to hold the data of the client userID
    const body=JSON.parse(req.body)
    //value[0]=body.userID
    var metadata=[body.userID]
    clients.set(ws,metadata)
    
    //everything below is the events for the websocket

    //when the client leaves
    ws.on("close", () => {
        clients.delete(ws);
    });
    //whenever the client sends a message
    //should be sent as a json of {targetID:id,aboutID:id,msg:message}
    ws.on('message',(data)=>{
        const {targetID,aboutID,msg}=JSON.parse(data)
        console.log(`received: ${data}`)
        clients.forEach((client,value)=>{
            //refer to line 8-11
            if(targetID!=value[0]||client.readyState!==WebSocket.OPEN){return;}
            client.send(JSON.stringify({aboutID,msg}))
        })
    })
    
})
