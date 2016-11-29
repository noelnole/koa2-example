const port = process.env.PORT || 4000;
//this will listen your app on http://localhost:3000
const src =  './src/app';

require('babel-polyfill');
  // Se usa en desarrollo porque reduce los tiempos de compilación porque
  //cache los resultados de la ejecución, no es recomendado en producción


require("babel-core/register")({
 "presets": [
 "es2015",
 "stage-0"
 ]
});

const app = require(src).default;
app.listen(port);
console.log("App listening on port "+port);
