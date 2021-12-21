const { User, Category, Product, Role } = require('../models');

// Verificar si el rol esta registrado
const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol: ${ rol } no está registrado en la DB`);
    }
};

// Verificar si el correo existe
const esEmailValido = async( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if( existeEmail ){
        throw new Error(`El correo: ${ correo } ya esta en uso`);       
    };
};

// Verificar si el ID existe
const existeUsuarioPorId = async( id ) => {
    const existeUsuarioId = await User.findById( id );
    if( !existeUsuarioId ){
        throw new Error(`El id: ${ id } no existe `);       
    };
};

// Verificar si el ID - Categoria existe
const existeCategoriaPorId = async( id ) => {
    const existeCategoriaId = await Category.findById( id );
    if( !existeCategoriaId ){
        throw new Error(`El id: ${ id } no existe `);       
    };
};

// Verificar si el ID - Producto existe
const existeProductoPorId = async( id ) => {
    const existeProductoId = await Product.findById( id );
    if( !existeProductoId ){
        throw new Error(`El id: ${ id } no existe `);       
    };
};

// Validar colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes( coleccion );
    if( !incluida ){
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}