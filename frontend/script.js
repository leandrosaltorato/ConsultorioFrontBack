const consultas = [
    {
        id: 1,
        paciente_nome: "Ana Costa",
        telefone: "(11) 99999-1234",
        medico_nome: "Dra. Camila",
        especialidade: "Cardiologia",
        data: "2024-09-25",
        hora: "14:00",
        status: "Agendada"
    },
    {
        id: 2,
        paciente_nome: "Jose Silva",
        telefone: "(11) 98888-5678",
        medico_nome: "Dr. Rodrigo",
        especialidade: "Clínico Geral",
        data: "2024-09-26",
        hora: "09:30",
        status: "Finalizada"
    },
    {
        id: 3,
        paciente_nome: "Maria Lima",
        telefone: "(11) 97777-4321",
        medico_nome: "Dra. Camila",
        especialidade: "Cardiologia",
        data: "2024-09-27",
        hora: "10:15",
        status: "Em andamento"
    },
    {
        id: 4,
        paciente_nome: "Carlos Pereira",
        telefone: "(11) 96666-1111",
        medico_nome: "Dr. Rodrigo",
        especialidade: "Clínico Geral",
        data: "2024-09-28",
        hora: "15:00",
        status: "Agendada"
    },
    {
        id: 5,
        paciente_nome: "Julia Souza",
        telefone: "(11) 95555-8888",
        medico_nome: "Dr. Bruno",
        especialidade: "Ortopedia",
        data: "2024-09-29",
        hora: "13:45",
        status: "Agendada"
    }
];

function listarConsultas(condList) {
    const tbody = document.querySelector("#consultas");
    tbody.innerHTML = "";

    condList.forEach(cond => {
        const med = document.createElement("tr");
        med.innerHTML = `
         <td>${cond.id}</td>
        <td>${cond.paciente_nome}</td>
        <td>${cond.telefone}</td>
        <td>${cond.medico_nome}</td>
        <td>${cond.especialidade}</td>
        <td>${cond.data}</td>
        <td>${cond.hora}</td>
        <td>${cond.status}</td>
        `;
        tbody.appendChild(med);
    });
}

listarConsultas(consultas);



const inpSearch = document.querySelector("#search");

inpSearch.addEventListener("keyup", function () {
    const termsearch = inpSearch.value.toLowerCase();

    const filterConsultas = consultas.filter(cons =>
        cons.especialidade.toLowerCase().includes(termsearch)
    );

    listarConsultas(filterConsultas);
})



