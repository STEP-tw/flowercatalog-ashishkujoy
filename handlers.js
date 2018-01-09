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
