const fs = require("fs");
const Comments = require("./comments.js");

const CommentHandler = function(storagePath) {
  this.storagePath=storagePath;
  this.comments;
}

const loadComments = function() {
  let filePath = this.storagePath;
  let commentHandler = this;
  fs.readFile(filePath,"utf8",function(err,comments){
    if(err) throw err;
    if(comments=="")
      return commentHandler.comments=new Comments([]);
    comments = JSON.parse(comments);
    commentHandler.comments=new Comments(comments);
  });
}

const storeComment = function(comment) {
  this.comments.addNewComment(comment);
  let allComments = this.comments.getAllComments();
  fs.writeFile(this.storagePath,JSON.stringify(allComments),function(err){
    if(err) throw err;
  })
}

const map = function(mapperFunction) {
  return this.comments.map(mapperFunction);
};


CommentHandler.prototype = {
  loadComments:loadComments,
  storeComment:storeComment,
  map:map
}
module.exports = CommentHandler;
