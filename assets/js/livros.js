let livros = [];
let contador = 1;

function salvar() {
    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let paginas = Number(document.getElementById("paginas").value);
    let ano = Number(document.getElementById("ano").value);

    let tipoSelecionado = document.querySelector('input[name="tipo"]:checked');
    let tipo = tipoSelecionado ? tipoSelecionado.value : "";

    if (!titulo || !autor || paginas <= 0 || ano <= 0) {
        alert("Preencha todos os campos!");
        return;
    }

    let classificacao = ano < 2010 ? "Livro antigo" : "Livro recente";

    let livro = {
        codigo: codigo ? Number(codigo) : contador++,
        titulo,
        autor,
        paginas,
        ano,
        tipo,
        classificacao
    };

    if (codigo) {
        let index = livros.findIndex(l => l.codigo == codigo);
        livros[index] = livro;
    } else {
        livros.push(livro);
    }

    atualizarTabela();
    limpar();
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaLivros");
    tabela.innerHTML = "";

    livros.forEach(livro => {
        tabela.innerHTML += `
            <tr>
                <td>${livro.codigo}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.paginas}</td>
                <td>${livro.ano}</td>
                <td>${livro.classificacao}</td>
                <td>
                    <button onclick="editar(${livro.codigo})">Editar</button>
                    <button onclick="excluir(${livro.codigo})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(codigo) {
    let livro = livros.find(l => l.codigo == codigo);

    document.getElementById("codigo").value = livro.codigo;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("paginas").value = livro.paginas;
    document.getElementById("ano").value = livro.ano;

    document.querySelectorAll('input[name="tipo"]').forEach(r => {
        r.checked = r.value === livro.tipo;
    });
}

function excluir(codigo) {
    livros = livros.filter(l => l.codigo != codigo);
    atualizarTabela();
}

function limpar() {
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("paginas").value = "";
    document.getElementById("ano").value = "";

    document.querySelectorAll('input[name="tipo"]').forEach(r => r.checked = false);
}




