const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);


    res.json({
        msg: 'get API - Controlador',
        total,
        usuarios
    });
};

const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    // Validar contra la base de datos
    if( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - Controlador',
        usuario
    });
};

const usuariosPost = async(req, res = response ) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    });
};

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = async(req, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        msg: 'delete API - Controlador',
        usuario
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}