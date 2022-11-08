const url = 'http://localhost:5000/';
const local=require("../hooks/useLocalStorageAuth")

const buildHeader = (request, content) => {
  Object.keys(content).forEach((key) =>
    request.setRequestHeader(key, content[key])
  );
  return request;
};
const buildQuery = (query)=>{
  var len=Object.keys(query).length;
  return "?"+Object.keys(query).forEach((key,i)=>key+"="+query[key]+(i<len?"&":""))
}
export const sendRequest = async (path, type, contents) => {
  return new Promise(resolve=>
    {
    console.log('sending req');
    var query=buildQuery(contents.query);
    var xml = new XMLHttpRequest();
    xml.open(type, url + path+query,true);
    xml.onload = function () {resolve(xml.response);};
    xml = buildHeader(xml, contents.header);
    xml.send('');
  })
};

export const updateToken = async() => {
  console.log("checking token validity")
  var token=local.getLocal("token")
  const newToken=await sendRequest("token","GET",{token})
  local.storeLocal("token",JSON.parse(newToken).token)
}