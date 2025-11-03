const validaAdministradores = (req, res, next) => {
    let user = req.header('user');
    if(user.cargo === 'administrador'){
        next();
    } else {
        res.status(403).send({message: 'Sem permissão.'}).end();
    }
}

const validaAtendentes = (req, res, next) => {
    let user = req.header('user');
    if(user.cargo === 'atendente' || user.cargo === 'administrador'){
        next();
    } else {
        res.status(403).send({message: 'Sem permissão.'}).end();
    }
}

module.exports = {
    validaAdministradores,
    validaAtendentes
}