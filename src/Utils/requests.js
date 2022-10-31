const url = 'http://localhost:5000/';

const buildHeader = (request, content) => {
  Object.keys(content).forEach((key) =>
    request.setRequestHeader(key, content[key])
  );
  return request;
};

export const sendRequest = (path, type, contents) => {
  console.log('sending req');
  var xml = new XMLHttpRequest();
  xml.open(type, url + path);
  xml = buildHeader(xml, contents);
  xml.send('');
};
