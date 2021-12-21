const { response, request } = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const usersGet = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);


    res.json({
        msg: 'get API - Controlador',
        total,
        users
    });
};

const usersPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    
    // Validar contra la base de datos
    if( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - Controlador',
        user
    });
};

const usersPost = async(req, res = response ) => {
    
    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });
    
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json({
        msg: 'post API - Controlador',
        user
    });
};

const usersPatch = (req, res = response ) => {
    res.json({
        msg: 'patch API - Controlador'
    });
};

const usersDelete = async(req, res = response ) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json({
        msg: 'delete API - Controlador',
        user
    });
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
}