const utils = require('./utils.js');
const lib = require('./commonLib.js');

const respondLoginFailed = function(res) {
  res.setHeader('Set-Cookie','logInFailed=true');
  res.write('login failed');
  res.end();
}
exports.respondLoginFailed=respondLoginFailed;

const responseWithGuestBook = function(res) {
  res.redirect('/guestBook');
}
exports.responseWithGuestBook = responseWithGuestBook;

const processCommentLoadingReq = function(session,commentHandler,req,res) {
  let serverResponse = {};
  if(utils.isUserNotLoggedIn(req,session)){
    serverResponse.notLogedIn = true;
  }else{
    serverResponse.username = utils.getLogedUserName(session,req.cookies.sessionid);
  }
  serverResponse.comments= commentHandler.map(utils.toHtmlTable).join('<br/>');
  res.write(JSON.stringify(serverResponse));
  res.end();
}
exports.processCommentLoadingReq=processCommentLoadingReq;

const registerUser = function(registeredUsers,req,res) {
  if(utils.isUserAlreadyLogedIn(req)){
    res.redirect('/guestBook');
    return;
  }
  registeredUsers.push(req.body.username);
  res.redirect('/guestBook');
}
exports.registerUser=registerUser;

const processLoginRequest = function(registeredUsers,session,req,res) {
  let username = req.body.username;
  if(utils.isUserAlreadyLogedIn(req)){
    res.redirect('/guestBook');
    return;
  }
  if(!registeredUsers.includes(username)) return respondLoginFailed(res);
  let sessionid = new Date().getTime();
  session[sessionid] = username;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  responseWithGuestBook(res);
}
exports.processLoginRequest = processLoginRequest

const processLogoutRequest = function(req,res) {
  let time = new Date().toUTCString();
  res.setHeader('Set-Cookie',[`logInFailed=false; Expires=${time}`,`sessionid=0; Expires=${time}`]);
  res.redirect('/login.html')
}
exports.processLogoutRequest = processLogoutRequest;

const storeComments = function(commentHandler,session,req,res) {
  if(utils.isUserNotLoggedIn(req,session)){
    lib.getLogedUserNamerespondWithNotFound(res);
    return;
  }
  commentHandler.storeComment(req.body);
  res.statusCode=200;
  res.end();
}
exports.storeComments = storeComments;

const processStaticFileRequest = lib.processStaticFileRequest;
exports.processStaticFileRequest=processStaticFileRequest;
