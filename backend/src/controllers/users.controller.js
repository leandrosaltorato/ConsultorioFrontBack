const db = require("../data/connection");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }

    try {
        const senhaHash = crypto.createHash('md5').update(password).digest('hex').toString();

        console.log(username, senhaHash);

        const user = await db.query("SELECT * FROM equipe WHERE email = ? AND senha = ?", [username, senhaHash]);  

        if (user.length === 0) {
            return res.status(401).json({ message: "Nome ou senha inválidos." });
        }

        const token = jsonwebtoken.sign(
            { 
                id: user[0][0].id_equipe, 
                nome: user[0][0].username,
                cargo: user[0][0].cargo
            },
            process.env.SECRET_JWT,
            { expiresIn: '60min' }
        );

        res.status(200).json({ token });
    }catch (error) {
        console.error("Erro durante o login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const cadastro = async (req, res) => {
    const { nome, email, senha, cargo } = req.body;

    if (!nome || !email || !senha || !cargo) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }

    try {
        const senhaHash = crypto.createHash('md5').update(senha).digest('hex').toString();

        await db.query("INSERT INTO equipe (nome, email, senha, cargo) VALUES (?, ?, ?, ?)", [nome, email, senhaHash, cargo]);
        
        res.status(201).json({ message: "Usuário cadastrado com sucesso." });
    } catch (error) {
        console.error("Erro durante o registro do usuário:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT id_equipe, nome, email, cargo FROM equipe");
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.query("SELECT id_equipe, nome, email, cargo FROM equipe WHERE id_equipe = ?", [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, cargo } = req.body;

    if (!nome || !email || !senha || !cargo) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }
    
    try {
        const senhaHash = crypto.createHash('md5').update(senha).digest('hex').toString();
        const [result] = await db.query("UPDATE equipe SET nome = ?, email = ?, senha = ?, cargo = ? WHERE id_equipe = ?", [nome, email, senhaHash, cargo, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM equipe WHERE id_equipe = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    login,
    cadastro,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}

