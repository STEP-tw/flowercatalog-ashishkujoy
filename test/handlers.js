const lib = require('../handlers.js');
const assert = require('chai').assert;
const Response = require('./response.js');

describe('isUserNotLoggedIn',function(){
  let sessions = {'123456':'username0','43215':'username1'};
  it('should give true if a sessionid of cookie is registered in sessions',function(){
    let req = {cookies:{sessionid:'12BV456'}};
    assert.isOk(lib.isUserNotLoggedIn(req,sessions))
  })
  it('should give false if a sessionid of cookie is not present in sessions',function(){
    let req = {cookies:{sessionid:'123456'}};
    assert.isNotOk(lib.isUserNotLoggedIn(req,sessions))
  })
  it('should give true if their is no sessionid present in sessions',function(){
    let req = {cookies:{sessionid:'123456'}};
    sessions = {}
    assert.isOk(lib.isUserNotLoggedIn(req,sessions))
  })
  it('should give false if their is no sessionid present in cookie',function(){
    let req = {cookies:{sessionid:'123456'}};
    sessions = {}
    assert.isOk(lib.isUserNotLoggedIn(req,sessions))
  })
})

describe('respondLoginFailed',function(){
  let res = new Response();
  let expected = new Response();
  expected.responseText='login failed';
  expected.headers.cookie='logInFailed=true';
  expected.finished = true;
  it('should write login failed in res and set login failed cookie in res.header',function(){
    lib.respondLoginFailed(res);
    assert.deepEqual(res,expected);
  })
})

describe('responseWithGuestBook',function(){
  let res = new Response();
  let expected = new Response();
  expected.finished=true;
  expected.headers = {'location':'/guestBook'};
  expected.statusCode = 302;
  it('should redirect to /guestBook url',function(){
    lib.responseWithGuestBook(res);
    assert.deepEqual(expected,res)
  })
})
