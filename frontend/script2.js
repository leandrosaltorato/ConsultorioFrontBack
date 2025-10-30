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

document.getElementById("total-consultas").textContent = consultas.length;


const statusCounts = {
    "Agendada": 0,
    "Finalizada": 0,
    "Em andamento": 0
};

consultas.forEach(consulta => {
    statusCounts[consulta.status]++;
});

console.log(statusCounts);

document.getElementById("agendadas").textContent = statusCounts["Agendada"];
document.getElementById("finalizadas").textContent = statusCounts["Finalizada"];
document.getElementById("em-andamento").textContent = statusCounts["Em andamento"];


const especialidadeCounts = {};

consultas.forEach(function(consulta) {
  const esp = consulta.especialidade;
  if (especialidadeCounts[esp]) {
    especialidadeCounts[esp]++;
  } else {
    especialidadeCounts[esp] = 1;
  }
});

// Cria um texto simples
let texto = "";

Object.keys(especialidadeCounts).forEach(function(esp) {
  texto += esp + ": " + especialidadeCounts[esp] + "<br>";
});

// Mostra no HTML
document.getElementById("consultas-especialidade").innerHTML = texto;
