var koa = require('koa');
var bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
import api from './api';


var app = new koa();

const bearertoken = async (ctx, next) => {
  var token;
  const bearer =  'bearer';
  const authorization = ctx.request.headers.authorization;
  const  headers  = ctx.request.headers;
  if (ctx == null || ctx === 0 || Object.keys(ctx).length === 0){
    return ctx.throw("JWT token is bad formatted",401);
  }else {
    const authorization  = ctx.request.headers.authorization;
    if (authorization) {
      var parts = authorization.split(' ');
      if (parts.length === 2 && parts[0] === bearer) {
        token = parts[1];
        ctx.state.authorizationHeader = authorization;
        await next();
      }else{
        return ctx.throw("JWT token is bad formatted",401);
      }
    }else{
      return ctx.throw("JWT token is mandatory",401);
    }
  }
}

async function setHeader(ctx,next){
    ctx.state.authorizationHeader = 'Key ' + "clave";
    await next();
}

app
  .use(morgan())
  .use(bodyParser())
  .use(bearertoken)
  .use(setHeader)
  .use(api.routes())
  .use(api.allowedMethods())

export default app;
