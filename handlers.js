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
