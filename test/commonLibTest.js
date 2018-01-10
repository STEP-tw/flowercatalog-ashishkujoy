const assert = require('chai').assert;
const lib = require('../lib/commonLib.js');
const Response = require('./response.js');

describe('getContentType',function(){
  it('should give "text/html if name is ending with .html',function(){
    let expected = 'text/html';
    assert.equal(lib.getContentType('one.html'),expected);
    assert.equal(lib.getContentType('sone.fsf.html'),expected);
  })
  it('should give "text/css" if name is ending with .css',function(){
    let expected = 'text/css';
    assert.equal(lib.getContentType('one.css'),expected);
    assert.equal(lib.getContentType('sone.fsf.css'),expected);
  })
})

describe('respondWithNotFound',function(){
  it('should statusCode to 404 and write not found in responseText',function(){
    let res = new Response();
    let expected = new Response('not found',404,true);
    lib.respondWithNotFound(res)
    assert.deepEqual(res,expected);
  })
})

describe('deliverFile',function(){
  let res,expected = {}
  beforeEach(function(){
    res = new Response();
    expected = new Response('',200,true);
  })

  it('should replace responseText with given file content and set text/html as content-type',function(){
    let fileContent = '<p>hello, it is a testing text</p>';
    let contentType = 'text/html';
    expected.responseText = fileContent;
    expected.contentType = contentType;
    lib.deliverFile(fileContent,contentType,res);
    assert.deepEqual(res,expected);
  })

  it('should replace responseText with given file content and set text/css as content-type',function(){
    let fileContent = '<p>hello, it is another testing text</p>';
    let contentType = 'text/css';
    expected.responseText = fileContent;
    expected.contentType = contentType;
    lib.deliverFile(fileContent,contentType,res);
    assert.deepEqual(res,expected);
  })
})
