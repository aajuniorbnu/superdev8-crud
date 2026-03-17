let alunos = [];
let codigo = 1;

function salvar() {
    let codigo = document.getElementById("codigo").value;
    let nome = document.getElementById("nome").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);

    let turnoSelecionado = document.querySelector('input[name="turno"]:checked');
    let turno = turnoSelecionado ? turnoSelecionado.value : "";

    if (!nome || nota1 === 0 || nota2 === 0 || nota3 === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    let media = (nota1 + nota2 + nota3) / 3;
    let situacao = media >= 7 ? "Aprovado" : "Reprovado";

    let aluno = {
        codigo: codigo ? Number(codigo) : codigo = codigo +1,
        nome,
        nota1,
        nota2,
        nota3,
        media,
        situacao,
        turno
    };

    if (codigo) {
        let index = alunos.findIndex(a => a.codigo == codigo);
        alunos[index] = aluno;
    } else {
        alunos.push(aluno);
    }

    atualizarTabela();
    limpar();
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        tabela.innerHTML += `
            <tr>
                <td>${aluno.codigo}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.nota1}</td>
                <td>${aluno.nota2}</td>
                <td>${aluno.nota3}</td>
                <td>${aluno.media.toFixed(2)}</td>
                <td>${aluno.situacao}</td>
                <td>
                    <button onclick="editar(${aluno.codigo})">Editar</button>
                    <button onclick="excluir(${aluno.codigo})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(codigo) {
    let aluno = alunos.find(a => a.codigo == codigo);

    document.getElementById("codigo").value = aluno.codigo;
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("nota1").value = aluno.nota1;
    document.getElementById("nota2").value = aluno.nota2;
    document.getElementById("nota3").value = aluno.nota3;

    let radios = document.querySelectorAll('input[name="turno"]');
    radios.forEach(r => {
        r.checked = r.value === aluno.turno;
    });
}

function excluir(codigo) {
    alunos = alunos.filter(a => a.codigo != codigo);
    atualizarTabela();
}

function limpar() {
    document.getElementById("codigo").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";

    document.querySelectorAll('input[name="turno"]').forEach(r => r.checked = false);
}