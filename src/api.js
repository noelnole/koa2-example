//Aquí reside el core de nuestra aplicación
//KOA tiene que usar el koa-router.
//import KoaRouter from 'koa-router';
var Router = require('koa-router');
const api = new Router();

var db = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' }
};


//Validatekey
const validateKey = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  console.log(authorization);
  if (authorization !== ctx.state.authorizationHeader) {
    return ctx.throw(401);
  }
  await next();
}

api.get('/pets',async (ctx, next) => {
  console.log("Entra en pets");
  ctx.body = 'hola';

  var names = Object.keys(db);
  ctx.body = 'pets: ' + names.join(', ');
});
//api.get('/peta', pets.list);
api.get('/pets/:name',  async (ctx, next) => {
  console.log("Entra en pets show");
  console.log("Parametros ",ctx.params.name);
  ctx.redirect('/pets');
  var pet = db[ctx.params.name];
  if (!pet)
    return this.throw('cannot find that pet', 404);
  ctx.body = pet.name + ' is a ' + pet.species;
});

api.post('/pet',

  async (ctx, next) => {
    ctx.set('authorization', "Bearer 123");
     //validateData,

    ctx.redirect('/pets');

     const { pet } = ctx.params;
     console.log(ctx.request.body);
     ctx.body= ctx.request.body;
    ctx.status = 201;
  });

export default api;
