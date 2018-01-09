const isUserNotLoggedIn = function(req,session) {
  let sessionid = req.cookies.sessionid
  return session[sessionid]==undefined;
}

const getLogedUserName = function(session,sessionid) {
  return session[sessionid];
}

const toHtmlTable = function(commentRecord) {
  return `<p>${commentRecord.date} ${commentRecord.name} ${commentRecord.comment}</p>`;
}

const isUserAlreadyLogedIn = function(req) {
  return req.sessionid != undefined;
}

const respondLoginFailed = function(res) {
  res.setHeader('Set-Cookie','logInFailed=true');
  res.write('login failed');
  res.end();
}

const responseWithGuestBook = function(res) {
  res.redirect('/guestBook');
}

const processCommentLoadingReq = function(session,commentHandler,req,res) {
  let serverResponse = {};
  if(isUserNotLoggedIn(req,session)){
    serverResponse.notLogedIn = true;
  }else{
    serverResponse.username = getLogedUserName(session,req.cookies.sessionid);
  }
  serverResponse.comments= commentHandler.map(toHtmlTable).join('<br/>');
  res.write(JSON.stringify(serverResponse));
  res.end();
}
exports.processCommentLoadingReq=processCommentLoadingReq;

const registerUser = function(registeredUsers,req,res) {
  if(isUserAlreadyLogedIn(req)){
    res.redirect('/guestBook');
    return;
  }
  registeredUsers.push(req.body.username);
  res.redirect('/guestBook');
}
exports.registerUser=registerUser;

const processLoginRequest = function(registeredUsers,session,req,res) {
  let username = req.body.username;
  if(isUserAlreadyLogedIn(req)){
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
