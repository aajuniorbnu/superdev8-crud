let contador = 1;

function salvar() {
    let cliente = document.getElementById("cliente").value;
    let lanche = document.getElementById("lanche").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let preco = Number(document.getElementById("preco").value);

  
    let total = quantidade * preco;


    let tabela = document.getElementById("tabelaPedidos");

    let linha = `
        <tr>
            <td>${contador++}</td>
            <td>${cliente}</td>
            <td>${lanche}</td>
            <td>${quantidade}</td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>R$ ${total.toFixed(2)}</td>
        </tr>
    `;

    tabela.innerHTML += linha;

  
    document.getElementById("cliente").value = "";
    document.getElementById("lanche").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
}