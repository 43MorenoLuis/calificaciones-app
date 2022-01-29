const { users } = require('../FakeData');
const { User } = require('../models');
const { generateJWT } = require('../helpers');
const bcryptjs = require('bcryptjs');


const resolvers = {
    Query: {
        getAllUsers() {
            return users
        }
    },

    Mutation: {
        createUser(root,{ input }){
            const newUser = new User( input );
            const res = newUser.save();
            console.log(res, '[Usuario]')
            //return res        
        },
        login: async(root, { input }) => {
            const { email, password } = input;

            try {

                // Verificar si el email existe
                const user = await User.findOne({ email });
                if( !user ){
                    return ({
                        ok: false,
                        msg: 'User / Password son incorrectos'
                    });
                }; 
        
                // Si el usuario esta activo
                if( !user.state ){
                    return ({
                        ok: false,
                        msg: 'User / Password son incorrectos'
                    });
                };
        
                // Verificar la contraseña
                const validPassword = bcryptjs.compareSync( password, user.password );
                if( !validPassword ){
                    return ({
                        ok: false,
                        msg: 'User / Password son incorrectos'
                    });
                };
        
                // Generar el JWT
                const token = await generateJWT( user.id, user.name );
        
                return ({
                    ok: true,
                    user,
                    token
                });
                
            } catch (error) {
                console.log(error);
                return({
                    ok: false,
                    msg: 'Hable con el administrador'
                });
            }
        }
    }
}

module.exports = {
    resolvers
}