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
function makeAJAXCall(methodType, url, callback, asyn = true, data = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
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
}
// for get url
const getUrl = "http://localhost:3000/employees";
function getUserDetials(data) {
  console.log('Get User Data at : ' + showTime() + 'data ' + data);
}
makeAJAXCall('GET', getUrl, getUserDetials, true);
 console.log('Made GET Call AJAX to server at:' + showTime());