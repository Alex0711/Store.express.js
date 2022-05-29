const Joi = require('joi'); //traigo a joi

//Acá solo creo los campos que voy a validar
const id = Joi.string().uuid();  //declaro el tipo de dato
const name = Joi.string().alphanum().min(3).max(15); //no acepta espacios por alphanum
const price = Joi.number().integer().min(10);
const image = Joi.string().uri()

//Los datos que van a recibir el create, update y get(o delete)
const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

//finalmente los exporto
module.exports = { createProductSchema, updateProductSchema, getProductSchema}
