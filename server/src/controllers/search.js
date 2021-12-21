const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const coleccionesPermitidas = [
    'user',
    'category',
    'product',
    'role'
];

const buscarUsuarios = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const user = await User.findById( termino );
        res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const users = await User.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
     });

    res.json({
        results: users
    });
}

const buscarCategorias = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const category = await Category.findById( termino );
        res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories
    });
}

const buscarProductos = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const product = await Product.findById( termino );
        res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const products = await Product.find({ name: regex, state: true });

    res.json({
        results: products
    });
}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch ( coleccion ) {
        case 'users':
            buscarUsuarios(termino, res);
        break;
        case 'categories':
            buscarCategorias(termino, res);
        break;
        case 'products':
            buscarProductos(termino, res);
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
    }
}

module.exports = {
    buscar
}