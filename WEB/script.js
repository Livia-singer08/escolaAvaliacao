const API_PROFESSOR = "http://localhost:3000/professor";
const API_TURMA = "http://localhost:3000/turma";
const API_ATIVIDADE = "http://localhost:3000/atividade";

const params = new URLSearchParams(window.location.search);
const turmaId = params.get("id");

async function entrar() {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        const res = await fetch(`${API_PROFESSOR}/listar`);
        const professores = await res.json();

        const professor = professores.find(
            p => p.email === email && p.senha === senha
        );

        if (!professor) {
            alert("Email ou senha inválidos.");
            return;
        }

        sessionStorage.setItem(
            "professor",
            JSON.stringify(professor)
        );

        window.location.href = "professor.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao realizar login.");
    }
}

async function listarTurmas() {

    const professor =
    JSON.parse(sessionStorage.getItem("professor"));

    if (!professor) return;

    try {

        const res = await fetch(`${API_TURMA}/listar`);
        const turmas = await res.json();

        const lista =
        document.getElementById("listaTurmas");

        lista.innerHTML = "";

        const minhasTurmas = turmas.filter(
            t => t.professorId === professor.id
        );

        if (minhasTurmas.length === 0) {

            lista.innerHTML =
            "<tr><td colspan='3'>Nenhuma turma cadastrada</td></tr>";

            return;
        }

        minhasTurmas.forEach(turma => {

            lista.innerHTML += `
                <tr>
                    <td>${turma.id}</td>
                    <td>${turma.nome}</td>
                    <td>
                        <button class="btn-ver"
                            onclick="irParaAtividades(${turma.id})">
                            Visualizar
                        </button>

                        <button class="btn-excluir"
                            onclick="excluirTurma(${turma.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("nomeProfessor").textContent = professor.nome;

    } catch (erro) {

        console.error(erro);

        document.getElementById("listaTurmas").innerHTML =
        "<tr><td colspan='3'>Erro ao carregar</td></tr>";
    }
}

function abrirCadastroTurma() {

    document.getElementById("modalTurma").style.display = "flex";
}

function fecharCadastroTurma() {

    document.getElementById("modalTurma").style.display = "none";
}

async function cadastrarTurma() {

    const nome =
    document.getElementById("nomeTurma").value.trim();

    const professor =
    JSON.parse(sessionStorage.getItem("professor"));

    if (!nome) {
        alert("Informe o nome da turma.");
        return;
    }

    try {

        await fetch(`${API_TURMA}/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nome,
                professorId: professor.id
            })
        });

        fecharCadastroTurma();

        listarTurmas();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar turma.");
    }
}

async function excluirTurma(id) {

    if (!confirm("Deseja excluir esta turma?")) {
        return;
    }

    try {

        const atividadesRes =
        await fetch(`${API_ATIVIDADE}/listar`);

        const atividades = await atividadesRes.json();

        console.log("Atividades:", atividades);

        const possuiAtividades =
        atividades.some(
            a => Number(a.turmaId) === Number(id)
        );

        if (possuiAtividades) {

            alert(
                "Você não pode excluir uma turma com atividades cadastradas"
            );

            return;
        }

        await fetch(
            `${API_TURMA}/excluir/${id}`,
            {
                method: "DELETE"
            }
        );

        listarTurmas();

    } catch (erro) {

        console.error(erro);
    }
}

function irParaAtividades(id) {

    window.location.href =
    `atividade.html?id=${id}`;
}

async function listarAtividades() {

    if (!turmaId) return;

    try {

        const turmaRes =
        await fetch(
            `${API_TURMA}/buscar/${turmaId}`
        );

        const turma =
        await turmaRes.json();

        document.getElementById("nomeTurma")
        .textContent = turma.nome;

        const professor =
        JSON.parse(sessionStorage.getItem("professor"));

        document.getElementById("nomeProfessor")
        .textContent = professor.nome;

        const atividadesRes =
        await fetch(
            `${API_ATIVIDADE}/listar`
        );

        const atividades =
        await atividadesRes.json();

        const lista =
        document.getElementById("listaAtividades");

        lista.innerHTML = "";

        const atividadesTurma =
        atividades.filter(
            a => Number(a.turmaId) === Number(turmaId)
        );

        if (atividadesTurma.length === 0) {

            lista.innerHTML =
            "<tr><td colspan='2'>Nenhuma atividade cadastrada</td></tr>";

            return;
        }

        atividadesTurma.forEach(atividade => {

            lista.innerHTML += `
                <tr>
                    <td>${atividade.id}</td>
                    <td>${atividade.descricao}</td>
                </tr>
            `;
        });

    } catch (erro) {

        console.error(erro);

        document.getElementById("listaAtividades").innerHTML =
        "<tr><td colspan='2'>Erro ao carregar</td></tr>";
    }
}

function abrirCadastroAtividade() {

    document.getElementById("modalAtividade").style.display = "flex";
}

function fecharCadastroAtividade() {

    document.getElementById("modalAtividade").style.display = "none";
}

async function cadastrarAtividade() {

    const descricao =
    document.getElementById("descricaoAtividade").value.trim();

    if (!descricao) {

        alert("Informe a descrição.");
        return;
    }

    try {

        await fetch(
            `${API_ATIVIDADE}/cadastrar`,
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    descricao,
                    turmaId: Number(turmaId)
                })
            }
        );

        fecharCadastroAtividade();

        listarAtividades();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar atividade.");
    }
}

function logout() {

    sessionStorage.clear();

    window.location.href = "login.html";
}

window.onload = () => {

    if (document.getElementById("listaTurmas")) {
        listarTurmas();
    }

    if (document.getElementById("listaAtividades")) {
        listarAtividades();
    }
};