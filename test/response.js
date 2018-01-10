const setCookies = function(headers,cookieField) {
  if(Array.isArray(cookieField)){
    cookieField = cookieField.join(',');
  }
  headers.cookie = cookieField;
}

const Response = function(resText,statusCode,finished) {
  this.responseText = resText||'';
  this.statusCode = statusCode||200;
  this.headers = {};
  this.contentType = '';
  this.finished=finished||false;
}

Response.prototype.write = function(text) {
  this.responseText+=text;
}

Response.prototype.end = function(string) {
  if(string) this.responseText+=string;
  this.finished = true;
}

Response.prototype.setHeader = function(field,value) {
  if(field=='Set-Cookie') return setCookies(this.headers,value);
  if(field=='location') return this.headers.location = value;
  this.contentType = value;
}

Response.prototype.redirect = function(path) {
  this.statusCode = 302;
  this.setHeader('location',`${path}`);
  this.finished=true;
}

module.exports = Response;
