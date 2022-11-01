const url = 'http://localhost:5000/';

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
