const url = 'http://localhost:5000/';
// const local = require('./useLocalStorageAuth');
const { storeLocal, getLocal } = require('./useLocalStorageAuth');
const buildHeader = (request, content) => {
  if (content == null) {
    return request;
  }
  content.token = getLocal('token');

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
  console.log(contents);
  return new Promise((resolve) => {
    var xml = new XMLHttpRequest();

    let xmlPath = url + path + buildQuery(contents.query);
    xml.open(type, xmlPath, true);
    buildHeader(xml, contents.header);
    xml.onload = function () {
      resolve(xml.response);
    };
    var _body = JSON.stringify(contents.body);
    // console.log(_body);
    xml.send(_body);
  });
};
//updates the current token
export const reloadToken = () => {
  console.log('reseting token expiration time');
  const token = getLocal('token');
  sendRequest('token', 'POST', {});
};
