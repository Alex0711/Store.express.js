const Joi = require('joi'); //traigo a joi

//Acá solo creo los campos que voy a validar
const id = Joi.number().integer();  //declaro el tipo de dato
const name = Joi.string().min(3).max(15); //no acepta espacios por alphanum
const description = Joi.string().min(10).max(255)
const price = Joi.number().integer().min(10);
const image = Joi.string().uri(); //uri creo que valida si es la url de una imagen
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const priceMin = Joi.number().integer().min(10);
const priceMax = Joi.number().integer().min(10);


//Los datos que van a recibir el create, update y get(o delete)
const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    description,
    image: image,
    categoryId,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when('priceMin', { //le digo que vea el campo priceMin
    is: Joi.number().integer(), //si es un entero
    then: Joi.required() //entonces priceMax es obligatorio
  })
});

//finalmente los exporto
module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}
