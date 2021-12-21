const { Schema, model, SchemaTypes } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: SchemaTypes.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: SchemaTypes.ObjectId,
        ref: 'Categoria',
        required: true
    },
    img: { type: String },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true } 
});

ProductoSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema );