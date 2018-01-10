const isUserNotLoggedIn = function(req,session) {
  let sessionid = req.cookies.sessionid
  return session[sessionid]==undefined;
}
exports.isUserNotLoggedIn=isUserNotLoggedIn;

const getLogedUserName = function(session,sessionid) {
  return session[sessionid];
}
exports.getLogedUserName=getLogedUserName;

const toHtmlTable = function(commentRecord) {
  return `<p>${commentRecord.date} ${commentRecord.name} ${commentRecord.comment}</p>`;
}
exports.toHtmlTable = toHtmlTable;

const isUserAlreadyLogedIn = function(req) {
  return req.sessionid != undefined;
}
exports.isUserAlreadyLogedIn = isUserAlreadyLogedIn;
