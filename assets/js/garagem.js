let codigo = 1;

function salvar() {
    let modelo = document.getElementById("modelo").value;
    let marca = document.getElementById("marca").value;
    let ano = Number(document.getElementById("ano").value);
    let valor = document.getElementById("valor").value;

    let portasSelecionada = document.querySelector('input[name="portas"]:checked');

    if (!modelo || !marca || !ano || !valor || !portasSelecionada) {
        alert("Preencha todos os campos!");
        return;
    }

    let portas = portasSelecionada.value;

    let anoAtual = new Date().getFullYear();
    let idade = anoAtual - ano;

    let tabela = document.getElementById("tabelaVeiculos");

    let linha = tabela.insertRow();

    linha.insertCell(0).innerText = codigo;
    linha.insertCell(1).innerText = modelo;
    linha.insertCell(2).innerText = marca;
    linha.insertCell(3).innerText = ano;
    linha.insertCell(4).innerText = "R$ " + valor;
    linha.insertCell(5).innerText = portas;
    linha.insertCell(6).innerText = idade + " anos";

    codigo = codigo +1;

    // limpar 
    document.getElementById("modelo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("valor").value = "";

    document.querySelectorAll('input[name="portas"]').forEach(r => r.checked = false);
}