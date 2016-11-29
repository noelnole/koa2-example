var koa = require('koa');
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
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

const getToken = async (ctx, next) => {
  console.log("Entramo en getToken");
  const { authorization } = ctx.request.headers;
  if (authorization == null) {
    console.log("401 no autorizado");
    return ctx.throw("JWT token is mandatory",401);
  }else{
    ctx.set(authorization);
    console.log("Hemos metido: ",authorization);
    await next();
  }
}

async function setHeader(ctx,next){
    ctx.state.authorizationHeader = 'Key ' + "clave";
    await next();
}

app
  .use(morgan())
  .use(bodyParser())
  .use(getToken)
  .use(setHeader)
  .use(api.routes())
  .use(api.allowedMethods())

export default app;
