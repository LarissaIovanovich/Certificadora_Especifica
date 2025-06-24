const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { Usuario } = require('../models');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            return res.status(401).json({ message: 'Usuário do token não encontrado.' });
        }

        // Anexa o usuário à requisição para ser usado nos próximos passos
        req.user = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

exports.requireRole = (allowedRoles) => {
    return (req, res, next) => {
        allowedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        if (req.user && allowedRoles.includes(req.user.papel)) {
            return next();
        }

        return res.status(403).json({ message: "Você não tem permissão para utilizar este recurso." });
    };
};