const url = 'http://localhost:5000/';
const local = require('../hooks/useLocalStorageAuth');

const buildHeader = (request, content) => {
  if (content == null) {
    return request;
  }
  Object.keys(content).forEach((key) =>
    request.setRequestHeader(key, content[key])
  );
  return request;
};
const buildQuery = (query) => {
  if (query == null) {
    return '';
  }
  var len = Object.keys(query).length;
  return (
    '?' +
    Object.keys(query).map(
      (key, i) => key + '=' + query[key] + (i < len ? '&' : '')
    )
  );
};
export const sendRequest = async (path, type, contents) => {
  return new Promise((resolve) => {
    console.log('sending req');
    var xml = new XMLHttpRequest();
    let xmlPath = url + path + buildQuery(contents.query);
    xml.open(type, xmlPath, true);
    xml.onload = function () {
      resolve(xml.response);
    };
    xml = buildHeader(xml, contents.header);
    xml.send('');
  });
};

export const updateToken = async () => {
  console.log('checking token validity');
  var token = local.getLocal('token');
  const newToken = await sendRequest('token', 'GET', { token });
  local.storeLocal('token', JSON.parse(newToken).token);
};
