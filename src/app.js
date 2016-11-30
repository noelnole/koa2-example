var koa = require('koa');
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const token = require('serenity-devstack-propagation');
import api from './api';

//const accessLogStream = fs.createWriteStream(__dirname + '/access.log',
    //                                         { flags: 'a' })


var app = new koa();

async function responseTime(ctx, next) {
  const start = new Date();
  await next;
  const ms = new Date() - start;
  console.log("tiempo: ", ms);
  ctx.set('X-Response-Time', ms);
}
/*var query = r.query
var body = r.body
var header = r.header

if (header && header.authorization) {
  var parts = header.authorization.split(' ')
  if (parts.length === 2 && parts[0] === headerKey) {
    if (token) {
      err = true
    }
    token = parts[1]
  }
}*/

const bearertoken = async (ctx, next) => {
  var token;
  const bearer =  'bearer';
  const { authorization } = ctx.request.headers;
  const  headers  = ctx.request.headers;
  if (headers && authorization) {
    var parts = authorization.split(' ');
    if (parts.length === 2 && parts[0] === bearer) {
      token = parts[1];
      ctx.set(authorization);
      await next();
    }else{
      return ctx.throw("JWT token is bad formatted",401);
    }
  }else{
    return ctx.throw("JWT token is mandatory",401);
  }
}

async function setHeader(ctx,next){
    ctx.state.authorizationHeader = 'Key ' + "clave";
    await next();
}

app
  .use(token())
  .use(morgan())
  .use(bodyParser())
//  .use(bearertoken)
  .use(setHeader)
  .use(api.routes())
  .use(api.allowedMethods())

export default app;
