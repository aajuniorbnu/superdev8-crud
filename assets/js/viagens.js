let viagens = [];
let codigo = 1;

function salvar() {
  let destino = document.getElementById("destino").value;
  let distancia = Number(document.getElementById("distancia").value);
  let passageiros = Number(document.getElementById("passageiros").value);
  let valor = Number(document.getElementById("valor").value);

  if (!destino || !distancia || !passageiros || !valor) {
    alert("Preencha tudo");
    return;
  }

  let total = passageiros * valor;

  let viagem = { codigo: codigo++, destino, distancia, passageiros, valor, total };
  viagens.push(viagem);

  renderTabela();
  atualizarDashboard();
  limpar();
}

function renderTabela() {
  let tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  viagens.forEach(v => {
    tabela.innerHTML += `
      <tr>
        <td>${v.codigo}</td>
        <td>${v.destino}</td>
        <td>${v.distancia}</td>
        <td>${v.passageiros}</td>
        <td>R$ ${v.valor.toFixed(2)}</td>
        <td>R$ ${v.total.toFixed(2)}</td>
      </tr>
    `;
  });
}

function atualizarDashboard() {
  let totalViagens = viagens.length;
  let totalValor = viagens.reduce((s, v) => s + v.total, 0);
  let totalPassageiros = viagens.reduce((s, v) => s + v.passageiros, 0);

  document.getElementById("totalViagens").innerText = totalViagens;
  document.getElementById("totalValor").innerText = "R$ " + totalValor.toFixed(2);
  document.getElementById("totalPassageiros").innerText = totalPassageiros;
}

function limpar() {
  document.getElementById("destino").value = "";
  document.getElementById("distancia").value = "";
  document.getElementById("passageiros").value = "";
  document.getElementById("valor").value = "";
}
