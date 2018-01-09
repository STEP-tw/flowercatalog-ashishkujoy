const Comments = function(comments) {
  this.allComments = comments;
}

const addNewComment = function(newComment) {
  newComment.date = new Date().toLocaleString();
  this.allComments.unshift(newComment);
}

const map = function(mapperFunction) {
  return this.allComments.map(mapperFunction);
}

const getAllComments = function() {
  return this.allComments;
}

Comments.prototype = {
  addNewComment:addNewComment,
  map:map,
  getAllComments:getAllComments
}

module.exports = Comments;
