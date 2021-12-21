const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, 
        esEmailValido, 
        existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRole } = require('../middlewares'); 

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    
    // Middlewares
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( esEmailValido ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    
    // Middlewares
    validarCampos
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    
    // Middlewares
    validarCampos
], usuariosDelete );

module.exports = router;