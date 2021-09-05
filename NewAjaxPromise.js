let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function showTime() {
  const date = new Date();
  return (
    date.getHours() +
    'Hrs:' +
    date.getMinutes() +
    'Mins:' +
    date.getSeconds() +
    'Secs:'
  );
}
function makePromiseCall(methodType, url, callback, asyn = true, data = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else if (xhr.status >= 400) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
          console.log(
            'Handle 400 client error or 500 server error at: ' + showTime()
          );
        }
      }
    };
    xhr.open(methodType, url, asyn);
    if (data) {
      xhr.setRequestHeader('Content-Type', 'apllication/json');
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
    console.log(methodType + ' request send to server at: ' + showTime());
  });
}
// for get url
const getUrl = " http://localhost:3000/employees";
makePromiseCall('GET', getUrl, true)
  .then((responseText) => {
    console.log('Get User Data at: ' + showTime() + 'data: ' + responseText);
  })
  .catch((error) => console.log('GET Error Status: ' + JSON.stringify(error)));
console.log('Made GET Call AJAX to server at:' + showTime());