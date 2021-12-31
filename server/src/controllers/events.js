const { response } = require("express");
const { Event } = require("../models");

// obtenerEventos - paginado -total - populate
const eventsGet = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, events ] = await Promise.all([
        Event.countDocuments( query ),
        Event.find( query )
            .populate('user', 'name')
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);


    res.json({
        total,
        events
    });
}

// obtenerEvento - populate
const eventGet = async( req, res = response ) => {

    const { id } = req.params;
    const event = await Event.findById( id )
        .populate('user', 'name');
    
    res.json( event );
}

// crearEvento
const eventPost = async( req, res = response ) => {

    const {state, user, ...body } = req.body;

    const eventDB = await Event.findOne({ title: body.title });

    if( eventDB ){
        return res.status(400).json({
            msg: `The event ${ eventDB.title } it already exists`
        });
    }

    // Genera la data a guardar
    const data = {
        ...body,
        title: body.title.toUpperCase(),
        notes: body.notes.toUpperCase(),
        user: req.user._id
    }

    const event = new Event( data );

    // Guarda DB
    await event.save();

    res.status(201).json(event);

}

// actualizarEvento
const eventPut = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    const event = await Event.findById( id );

    if( !event ){
        return res.status(404).json({
            ok: false,
            msg: 'Event does not exist for that id'
        })
    }

    if( event.user.toString() !== req.user._id ){
        return res.status(401).json({
            ok: false,
            msg: 'You cannot edit this event'
        })
    }

    const data = {
        ...body,
        title: body.title.toUpperCase(),
        notes: body.notes.toUpperCase(),
        user: req.user._id
    }

    const event = await Event.findByIdAndUpdate( id, data, { new: true } );

    res.json( event );
}

// borrarEvento - estado:false
const eventDelete = async( req, res = response ) => {

    const { id } = req.params;
    const eventDelete = await Event.findByIdAndUpdate( id, {state: false}, {new: true});

    res.json( eventDelete );
}

module.exports = {
    eventsGet,
    eventGet,
    eventPost,
    eventPut,
    eventDelete
}