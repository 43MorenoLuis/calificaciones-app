const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { User } = require('../models');

const login = async(req, res = response ) => {

    const { email, password } = req.body;
    
    try {

        // Verificar si el email existe
        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        }; 

        // Si el usuario esta activo
        if( !user.state ){
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        };

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos'
            });
        };

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const googleSignIn = async( req, res = response ) => {
    
    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if( !user ){
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User( data );
            await user.save();
        }

        // Si el usuario existe en DB
        if( !user.state ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
}

module.exports = {
    login,
    googleSignIn
};