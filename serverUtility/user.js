const fs = require('fs');
const UsersRecords = function(userFilePath){
  this.users = {};
  this.userFilePath=userFilePath;
}

UsersRecords.prototype.loadUsersDetails = function(){
  let userRecords = this;
  fs.readFile(this.userFilePath,'utf8',function(error,file){
    if(error) throw error;
    userRecords.users = JSON.parse(file) || {};
  });
}

UsersRecords.prototype.register
