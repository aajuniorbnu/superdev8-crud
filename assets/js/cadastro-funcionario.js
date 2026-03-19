let funcionarios = [];
let contador = 1;

function salvar() {
    let codigo = document.getElementById("codigo").value;
    let nome = document.getElementById("nome").value;
    let cargo = document.getElementById("cargo").value;
    let salario = Number(document.getElementById("salario").value);
    let filhos = Number(document.getElementById("filhos").value);

    if (!nome || !cargo || salario <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // cálculo do auxílio
    let auxilio = filhos > 0 ? filhos * 150 : 0;

    // salário final
    let salarioFinal = salario + auxilio;

    let funcionario = {
        codigo: codigo ? Number(codigo) : contador++,
        nome,
        cargo,
        salario,
        filhos,
        auxilio,
        salarioFinal
    };

    if (codigo) {
        let index = funcionarios.findIndex(f => f.codigo == codigo);
        funcionarios[index] = funcionario;
    } else {
        funcionarios.push(funcionario);
    }

    atualizarTabela();
    limpar();
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "";

    funcionarios.forEach(func => {
        tabela.innerHTML += `
            <tr>
                <td>${func.codigo}</td>
                <td>${func.nome}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
                <td>${func.filhos}</td>
                <td>R$ ${func.auxilio.toFixed(2)}</td>
                <td>R$ ${func.salarioFinal.toFixed(2)}</td>
                <td>
                    <button onclick="editar(${func.codigo})">Editar</button>
                    <button onclick="excluir(${func.codigo})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(codigo) {
    let func = funcionarios.find(f => f.codigo == codigo);

    document.getElementById("codigo").value = func.codigo;
    document.getElementById("nome").value = func.nome;
    document.getElementById("cargo").value = func.cargo;
    document.getElementById("salario").value = func.salario;
    document.getElementById("filhos").value = func.filhos;
}

function excluir(codigo) {
    funcionarios = funcionarios.filter(f => f.codigo != codigo);
    atualizarTabela();
}

function limpar() {
    document.getElementById("codigo").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("filhos").value = "";
}