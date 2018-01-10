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
