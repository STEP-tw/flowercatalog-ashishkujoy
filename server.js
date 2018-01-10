const timeStamp = require('./serverUtility/time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
const fs = require('fs');
const CommentHandler = require('./serverUtility/commentHandler.js');
const PORT = process.env.PORT||5000;
const lib = require('./lib/handlers.js');

let registeredUsers = ['joy','arvind'];
let session = {};
let commentHandler = new CommentHandler('./data/comments.json');
commentHandler.loadComments();

/*============================================================================*/
const logger = function(fs,req,res) {
  let logs = ['--------------------------------------------------------------',
    `${timeStamp()}`,
    `${req.method}`,
    `${req.url}`,
    `${JSON.stringify(req.headers,null,2)}`,
    ''
  ].join('\n');
  console.log(`${req.method}    ${req.url}`);
  fs.appendFile('./data/log.json',logs,()=>{});
}
/*============================================================================*/
let app = WebApp.create();
app.use((req,res)=>{
  logger(fs,req,res);
})
app.usePostProcess((req,res)=>{
  lib.processStaticFileRequest(fs,req,res);
});
app.get('/',(req,res)=>{
  res.redirect('/index.html');
})
app.get('/comments',(req,res)=>{
  lib.processCommentLoadingReq(session,commentHandler,req,res)
});
app.post('/register',(req,res)=>{
  lib.registerUser(registeredUsers,req,res)
});
app.post('/login',(req,res)=>{
  lib.processLoginRequest(registeredUsers,session,req,res)
});
app.get('/logout',lib.processLogoutRequest);
app.post('/submitForm',(req,res)=>{
  lib.storeComments(commentHandler,session,req,res);
});

let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
