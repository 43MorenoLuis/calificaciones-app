const { response } = require("express");
const { Category } = require("../models");

// obtenerCategorias - paginado -total - populate
const categoriesGet = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .populate('user', 'name')
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);


    res.json({
        total,
        categories
    });
}

// obtenerCategoria - populate
const categoryGet = async( req, res = response ) => {

    const { id } = req.params;
    const category = await Category.findById( id )
        .populate('user', 'name');
    
    res.json( category );
}

// crearCategoria
const categoryPost = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if( categoryDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name } ya existe`
        });
    }

    // Genera la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    // Guarda DB
    await category.save();

    res.status(201).json(category);

}

// actualizarCategoria
const categoryPut = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true } );

    res.json( category );
}

// borrarCategoria - estado:false
const categoryDelete = async( req, res = response ) => {

    const { id } = req.params;
    const categoryDelete = await Category.findByIdAndUpdate( id, {state: false}, {new: true});

    res.json( categoryDelete );
}

module.exports = {
    categoriesGet,
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete
}