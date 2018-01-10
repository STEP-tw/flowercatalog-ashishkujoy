const isUserNotLoggedIn = function(req,session) {
  let sessionid = req.cookies.sessionid
  return session[sessionid]==undefined;
}
exports.isUserNotLoggedIn=isUserNotLoggedIn;

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
exports.respondLoginFailed=respondLoginFailed;

const responseWithGuestBook = function(res) {
  res.redirect('/guestBook');
}
exports.responseWithGuestBook = responseWithGuestBook;

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
exports.getContentType = getContentType;

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

const storeComments = function(commentHandler,session,req,res) {
  if(isUserNotLoggedIn(req,session)){
    respondWithNotFound(res);
    return;
  }
  commentHandler.storeComment(req.body);
  res.statusCode=200;
  res.end();
}
exports.storeComments = storeComments;

const processStaticFileRequest = function(req,res) {
  if(res.finished) return;
  let filePath = './public'+req.url;
  let contentType = getContentType(filePath);
  req.fs.readFile(filePath,function(error,file){
    if(error) return respondWithNotFound(res);
    deliverFile(file,contentType,res);
  })
}
exports.processStaticFileRequest = processStaticFileRequest;
