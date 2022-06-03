const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/errorHandler') //debe estar debajo del routing

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.com'] //le doy acceso solo al puerto 8080 y a mi app
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('no permitido'))
    }
  }
}
// app.use(cors(options))
app.use(cors()); //si no le paso parámetros le doy acceso a todo el mundo. Hacerlo solo en API públicas!!!



routerApi(app);

app.use(logErrors);
app.use(sequelizeErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log('My port' + port)
})
