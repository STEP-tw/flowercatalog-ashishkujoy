const getCommentDetails = function(){
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  return {
    name:name,
    comment:comment
  }
}

const appendComment = function(commentDetail) {
  let newComment = document.createElement('p');
  let commentInnerHTML = [
    `name=${commentDetail.name}`,
    `comment=${commentDetail.comment}`
  ].join(' ')
  newComment.innerHTML=commentInnerHTML;
  let comments = document.getElementById('freshComments');
  comments.appendChild(newComment);
}

const recordComment = function() {
  let commentDetail = getCommentDetails();
  let req = new XMLHttpRequest();
  req.open('POST','/submitForm');
  req.onload=()=>{appendComment(commentDetail)};
  let commentData = `name=${commentDetail.name}&comment=${commentDetail.comment}`
  req.send(commentData);
}

const displayComments = function() {
  let comments = this.responseText;
  let commentsDiv = document.getElementById('freshComments');
  commentsDiv.innerHTML = comments;
}

const requestComments = function() {
  let req = new XMLHttpRequest();
  req.onload=displayComments;
  req.open('GET','/comments');
  req.send();
}

const loadGuestBookPage = function() {
  let commentButton = document.getElementById('commentButton');
  commentButton.onclick = recordComment;
  requestComments();
}


window.onload = loadGuestBookPage;
