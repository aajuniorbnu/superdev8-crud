let filmes = [];
let contador = 1;

function salvar() {
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    const duracao = Number(document.getElementById('duracao').value);
    const faixa = obterFaixaSelecionada();

    if (!validarCampos(nome, genero, duracao, faixa)) {
        return;
    }

    const classificacao = classificarFilme(duracao);
    const filme = criarFilme(codigo, nome, genero, duracao, faixa, classificacao);

    salvarOuAtualizar(filme, codigo);
    atualizarTabela();
    limpar();
}

function obterFaixaSelecionada() {
    let selecionado = document.querySelector('input[name="faixa"]:checked');
    if (selecionado) {
        return selecionado.value;
    } else {
        return "";
    }
}

function validarCampos(nome, genero, duracao, faixa) {
    if (!nome || !genero || duracao <= 0 || !faixa) {
        alert("Preencha todos os campos!");
        return false;
    } else {
        return true;
    }
}

function classificarFilme(duracao) {
    if (duracao >= 120) {
        return "Filme longo";
    } else {
        return "Filme curto";
    }
}

function criarFilme(codigo, nome, genero, duracao, faixa, classificacao) {
    let codigoFinal;
    if (codigo) {
        codigoFinal = Number(codigo);
    } else {
        codigoFinal = contador++;
    }

    return {
        codigo: codigoFinal,
        nome: nome,
        genero: genero,
        duracao: duracao,
        faixa: faixa,
        classificacao: classificacao
    };
}

function salvarOuAtualizar(filme, codigo) {
    if (codigo) {
        let index = filmes.findIndex(f => f.codigo == codigo);
        filmes[index] = filme;
    } else {
        filmes.push(filme);
    }
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaFilmes");
    tabela.innerHTML = "";

    filmes.forEach(filme => {
        tabela.innerHTML += `
            <tr>
                <td>${filme.codigo}</td>
                <td>${filme.nome}</td>
                <td>${filme.genero}</td>
                <td>${filme.duracao} min</td>
                <td>${filme.faixa}</td>
                <td>${filme.classificacao}</td>
                <td>
                    <button onclick="editar(${filme.codigo})">Editar</button>
                    <button onclick="excluir(${filme.codigo})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(codigo) {
    let filme = filmes.find(f => f.codigo == codigo);
    document.getElementById("codigo").value = filme.codigo;
    document.getElementById("nome").value = filme.nome;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("duracao").value = filme.duracao;
    document.querySelectorAll('input[name="faixa"]').forEach(r => {
        r.checked = r.value === filme.faixa;
    });
}

function excluir(codigo) {
    filmes = filmes.filter(f => f.codigo != codigo);
    atualizarTabela();
}

function limpar() {
    document.getElementById("codigo").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("duracao").value = "";
    document.querySelectorAll('input[name="faixa"]').forEach(r => r.checked = false);
}