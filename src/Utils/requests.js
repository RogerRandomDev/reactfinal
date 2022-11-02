const url = 'http://localhost:5000/';
const local=require("../hooks/useLocalStorageAuth")

const buildHeader = (request, content) => {
  Object.keys(content).forEach((key) =>
    request.setRequestHeader(key, content[key])
  );
  return request;
};

export const sendRequest = async (path, type, contents) => {
  return new Promise(resolve=>
    {
    console.log('sending req');
    var xml = new XMLHttpRequest();
    xml.open(type, url + path,true);
    xml.onload = function () {resolve(xml.response);};

    xml = buildHeader(xml, contents);
    xml.send('');
  })
};

export const updateToken = async() => {
  const token=local.getLocal("token")
  const newToken=await sendRequest("token","GET",{token})
  local.storeLocal("token",newToken.token)
}