let celulares = [];
let contador = 1;


function salvar() {
    let codigo = document.getElementById("codigo").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let valor = Number(document.getElementById("valor").value);
    let quantidade = Number(document.getElementById("quantidade").value);

    if (!validarCampos(marca, modelo, valor, quantidade)) return;

    let total = calcularTotal(valor, quantidade);

    let celular = criarCelular(codigo, marca, modelo, valor, quantidade, total);

    salvarOuAtualizar(celular, codigo);

    atualizarTabela();
    limpar();
}


function validarCampos(marca, modelo, valor, quantidade) {
    if (!marca || !modelo || valor <= 0 || quantidade <= 0) {
        alert("Preencha todos os campos corretamente!");
        return false;
    } else {
        return true;
    }
}


function calcularTotal(valor, quantidade) {
    return valor * quantidade;
}


function criarCelular(codigo, marca, modelo, valor, quantidade, total) {
    return {
        codigo: codigo ? Number(codigo) : contador++,
        marca,
        modelo,
        valor,
        quantidade,
        total
    };
}


function atualizar(celular, codigo) {
    let index = celulares.findIndex(c => c.codigo == codigo);
    if (index !== -1) {
        celulares[index] = celular;
    }
}


function adicionar(celular) {
    celulares.push(celular);
}


function salvarOuAtualizar(celular, codigo) {
    if (codigo) {
        atualizar(celular, codigo);
    } else {
        adicionar(celular);
    }
}


function atualizarTabela() {
    let tabela = document.getElementById("tabelaCelulares");
    tabela.innerHTML = "";

    celulares.forEach(c => {
        tabela.innerHTML += `
        <tr>
            <td>${c.codigo}</td>
            <td>${c.marca}</td>
            <td>${c.modelo}</td>
            <td>R$ ${c.valor.toFixed(2)}</td>
            <td>${c.quantidade}</td>
            <td>R$ ${c.total.toFixed(2)}</td>
            <td>
                <button onclick="editar(${c.codigo})">Editar</button>
                <button onclick="excluir(${c.codigo})">Excluir</button>
            </td>
        </tr>
        `;
    });
}


function editar(codigo) {
    let c = celulares.find(x => x.codigo == codigo);

    document.getElementById("codigo").value = c.codigo;
    document.getElementById("marca").value = c.marca;
    document.getElementById("modelo").value = c.modelo;
    document.getElementById("valor").value = c.valor;
    document.getElementById("quantidade").value = c.quantidade;
}


function excluir(codigo) {
    celulares = celulares.filter(c => c.codigo != codigo);
    atualizarTabela();
}


function limpar() {
    document.getElementById("codigo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = "";
}