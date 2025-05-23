const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Usuario = require('../models/Usuario');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.usuarioID);
        if (!usuario) {
            return res.status(401).json({ message: 'Token de usuário inválido' });
        }

        req.user = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

exports.requireRole = (allowedRoles) => {
    return (req, res, next) => {
        allowedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        if (allowedRoles.includes(req.user?.papel)) return next();

        // papel do usuário não está na lista allowedRoles
        return res.status(403).json({ message: "Você não tem permissão para utilizar este recurso" });
    };
};