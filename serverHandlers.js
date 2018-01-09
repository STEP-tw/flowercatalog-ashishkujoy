const timeStamp = require('./serverUtility/time.js').timeStamp;
const logger = function(req,res) {
  let logs = ['--------------------------------------------------------------',
    `${timeStamp()}`,
    `${req.method}`,
    `${req.url}`,
    `${JSON.stringify(req.headers,null,2)}`,
    ''
  ].join('\n');
  console.log(`${req.method}    ${req.url}`);
  req.fs.appendFile('./data/log.json',logs,()=>{});
}
exports.logger=logger;
const getContentType = function(filePath) {
  let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
  let contentTypes = {
      '.html':'text/html',
      '.css':'text/css',
      '.js':'text/javascript',
      '.png':'image/png',
      '.gif':'image/gif',
      '.jpg':'image/jpg',
      '.pdf':'application/pdf'
  }
  return contentTypes[fileExtension];
}

const deliverFile = function(file,contentType,res) {
    res.setHeader('Content-Type',`${contentType}`);
    res.statusCode=200;
    res.write(file);
    res.end();
}

const respondWithNotFound = function(res) {
    res.statusCode = 404;
    res.write('not found');
    res.end();
}

const processFileRequest = function(req,res) {
  if(res.finished) return;
  let filePath = './public'+req.url;
  let contentType = getContentType(filePath);
  req.fs.readFile(filePath,function(error,file){
    if(error) return respondWithNotFound(res);
    deliverFile(file,contentType,res);
  })
}
exports.processFileRequest = processFileRequest;

const tableData = function(data) {
  return `<td>${data}</td>`;
}

const toHtmlTable = function(object) {
  let date = tableData(object.date);
  let name = tableData(object.name);
  let comment = tableData(object.comment);
  return `<tr>${date} ${name} ${comment}</tr>`;
}


const registerUser = function(req,res) {
  registeredUsers.push(req.body.username);
  console.log(registeredUsers);
  res.redirect('/guestBook');
}
exports.registerUser = registerUser;

const respondLoginFailed = function(res) {
  res.setHeader('Set-Cookie','logInFailed=true');
  res.write('login failed');
  res.end();
}

const responseWithGuestBook = function(res) {
  res.redirect('/guestBook');
}

const processLoginRequest = function(req,res) {
  let username = req.body.username;
  if(!registeredUsers.includes(username)) return respondLoginFailed(res);
  let sessionid = new Date().getTime();
  session[sessionid] = username;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  responseWithGuestBook(res);
}
exports.processLoginRequest = processLoginRequest;

const handleGuestBookReq = function(req,res) {
  let user = session[req.cookies.sessionid];
  console.log(user);
  if(!user) return res.redirect('/login.html');
}
exports.handleGuestBookReq = handleGuestBookReq;

const processLogoutRequest = function(req,res) {
  let time = new Date().toUTCString();
  res.setHeader('Set-Cookie',[`logInFailed=false; Expires=${time}`,`sessionid=0; Expires=${time}`]);
  res.redirect('/login.html')
}
exports.processLogoutRequest = processLogoutRequest;
