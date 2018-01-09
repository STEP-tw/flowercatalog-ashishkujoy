const getCommentDetails = function(){
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  document.getElementById('comment_form').reset();
  return {
    name:name,
    comment:comment
  }
}

const prependComment = function(commentDetail) {
  let newComment = document.createElement('p');
  let commentInnerHTML = [
    `${new Date().toLocaleString()  }`,
    `${commentDetail.name }`,
    `${commentDetail.comment  }`
  ].join(' ')
  newComment.innerHTML=commentInnerHTML;
  let comments = document.getElementById('freshComments');
  comments.prepend(newComment);
}

const isIncomleteComment = function(commentDetail) {
  return commentDetail.name==""|| commentDetail.comment=="";
}

const recordComment = function() {
  let commentDetail = getCommentDetails();
  console.log(commentDetail);
  if(isIncomleteComment(commentDetail)) return;
  let req = new XMLHttpRequest();
  req.open('POST','/submitForm');
  req.onload=()=>{prependComment(commentDetail)};
  let commentData = `name=${commentDetail.name}&comment=${commentDetail.comment}`
  req.send(commentData);
}

const enableSubmitButton = function() {
  let commentButton = document.getElementById('commentButton');
  commentButton.onclick = recordComment;
}

const removeCommentPrivilege = function(){
  let commentButton = document.getElementById('commentButton');
  commentButton.onclick = null;
  let loginStatus = document.getElementById('login_status');
  loginStatus.innerHTML = "Please login to comment.";
}

const showUserName = function(username) {
  let loginStatus = document.getElementById('login_status');
  loginStatus.innerHTML = `wellcome ${username}`;
}

const displayComments = function() {
  let serverResponse = JSON.parse(this.responseText);
  let comments = serverResponse.comments;
  if(serverResponse.notLogedIn){
    removeCommentPrivilege();
  }else{
    showUserName(serverResponse.username);
  }
  let commentsDiv = document.getElementById('freshComments');
  console.log(comments);
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
