const Cookie = function() {
  this._cookies = {};
}

Cookie.prototype.addCookies = function(cookieKeyValPair) {
  let cookieFields = Object.keys(cookieKeyValPair);
  let cookies =[];
  for(let index=0;index<cookieFields.length;index++) {
    let cookieKey = cookieFields[index];
    this._cookies[cookieKey]=cookieKeyValPair[cookieKey];
    cookies.push(`${cookieKey}=${cookieKeyValPair[cookieKey]}`)
  }
  return cookies;
}

Cookie.prototype.deleteAllCookies = function(){
  let cookieKeys = Object.keys(this._cookies);
  let time = new Date().toUTCString();
  let cookies = [];
  for(let count=0;count<cookieKeys.length;count++) {
    let key = cookieKeys[count];
    cookies.push(`${this._cookies[key]}; Expires=${time}`);
  }
  this._cookies = {};
  return cookies;
}

module.exports = Cookie;
