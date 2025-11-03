const db = require("../data/connection");

const createConsulta = async (req, res) => {
    const { id_paciente, id_medico, data_consulta, status } = req.body;
    if (!id_paciente || !id_medico || !data_consulta || !status) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }
    try {
        await db.query("INSERT INTO consultas (id_paciente, id_medico, data_consulta, status) VALUES (?, ?, ?, ?)", [id_paciente, id_medico, data_consulta, status]);
        res.status(201).json({ message: "Consulta criada com sucesso." });
    } catch (error) {
        console.error("Erro ao criar consulta:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAllConsultas = async (req, res) => {
    try {
        const [consultas] = await db.query("SELECT * FROM consultas");
        res.status(200).json(consultas);
    }catch (error) {
        console.error("Erro ao buscar consultas:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getConsultaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [consulta] = await db.query("SELECT * FROM consultas WHERE id_consulta = ?", [id]);
        if (consulta.length === 0) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }
        res.status(200).json(consulta[0]);
    }catch (error) {
        console.error("Erro ao buscar consulta:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updateConsulta = async (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_medico, data_consulta, status } = req.body;
    if (!id_paciente || !id_medico || !data_consulta || !status) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }
    try {
        const [result] = await db.query("UPDATE consultas SET id_paciente = ?, id_medico = ?, data_consulta = ?, status = ? WHERE id_consulta = ?", [id_paciente, id_medico, data_consulta, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }
        res.status(200).json({ message: "Consulta atualizada com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteConsulta = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM consultas WHERE id_consulta = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }
        res.status(200).json({ message: "Consulta deletada com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar consulta:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const consultasByRole = async (req, res) => {
    try {
        const [consultas] = await db.query("SELECT COUNT(*) FROM consultas JOIN equipe ON consultas.id_medico = equipe.id_equipe WHERE equipe.cargo <> 'administrador' AND equipe.cargo <> 'atendente'");
        res.status(200).json(consultas);
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const listagemGeral = async (req, res) => {
    try {
        const [result] = await db.query("SELECT p.nome AS nome_paciente, e.cargo AS especialidade_medico, c.data_consulta, c.status FROM consultas c JOIN pacientes p ON c.id_paciente = p.id_paciente JOIN equipe e ON c.id_medico = e.id_equipe");
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao buscar listagem geral de consultas:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    createConsulta,
    getAllConsultas,
    getConsultaById,
    updateConsulta,
    deleteConsulta,
    consultasByRole,
    listagemGeral
};