const db = require("../data/connection");

const createPaciente = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }

    try {
        await db.query("INSERT INTO pacientes (nome, idade, endereco, telefone) VALUES (?, ?, ?, ?, ?)", [nome, cpf, data_nascimento, telefone, email]);
        res.status(201).json({ message: "Paciente criado com sucesso." });
    } catch (error) {
        console.error("Erro ao criar paciente:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAllPacientes = async (req, res) => {
    try {
        const user = req.header('user');
        if(user.cargo === 'administrador'){
            const [pacientes] = await db.query("SELECT * FROM pacientes");
            res.status(200).json(pacientes);
        }else if(user.cargo === 'atendente'){
            const [pacientes] = await db.query("SELECT id, nome, telefone, email FROM pacientes");
            res.status(200).json(pacientes);
        }else{
            const medico = req.header('id_equipe');
            const [pacientes] = await db.query("SELECT p.id, p.nome, p.telefone, p.email FROM pacientes p JOIN consultas c ON p.id = c.id_paciente WHERE c.id_equipe = ?", [medico]);
            res.status(200).json(pacientes);
        }
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = req.header('user');
        if(user.cargo === 'administrador'){
            const [pacientes] = await db.query("SELECT * FROM pacientes WHERE id_paciente = ?", [id]);
            res.status(200).json(pacientes);
        }else if(user.cargo === 'atendente'){
            const [pacientes] = await db.query("SELECT id, nome, telefone, email FROM pacientes WHERE id_paciente = ?", [id]);
            res.status(200).json(pacientes);
        }else{
            const medico = req.header('id_equipe');
            const [pacientes] = await db.query("SELECT p.id, p.nome, p.telefone, p.email FROM pacientes p JOIN consultas c ON p.id = c.id_paciente WHERE c.id_equipe = ? AND WHERE id_paciente", [medico, id]);
            res.status(200).json(pacientes);
        }
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, data_nascimento, telefone, email } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }

    try {
        const [result] = await db.query("UPDATE pacientes SET nome = ?, cpf = ?, data_nascimento = ?, telefone = ?, email = ? WHERE id_paciente = ?", [nome, cpf, data_nascimento, telefone, email, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Paciente não encontrado." });
        }
        res.status(200).json({ message: "Paciente atualizado com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM pacientes WHERE id_paciente = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Paciente não encontrado." });
        }
        res.status(200).json({ message: "Paciente deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar paciente:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const pacientesByMedico = async (req, res) => {
    try {
        const [result] = await db.query("SELECT e.nome AS medico, COUNT(DISTINCT c.id_paciente) AS pacientes_atendidos FROM consultas c JOIN equipe e ON c.id_medico = e.id_equipe GROUP BY e.id_equipe, e.nome ORDER BY pacientes_atendidos DESC");
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao buscar pacientes do médico:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente,
    pacientesByMedico
};