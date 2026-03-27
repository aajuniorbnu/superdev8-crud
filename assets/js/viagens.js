let listaDeViagens = [];
let proximoCodigo = 1;

function salvarViagem(){
let destino = document.getElementById('destino').value;
let distancia = Number(document.getElementById('distancia').value);
let passageiros = Number(document.getElementById('passageiros').value);
let valorPorPessoa = Number(document.getElementById('valor').value);

let fomularioIcompleto = !destino || !distancia || !passageiros || !valorPorPessoa;

if(fomularioIcompleto){
  alert("Preencha todos os campos antes de salvar");
  return;
}

let valorTotal = passageiros * valorPorPessoa;

//criar objeto da viagem (com indentificador unico)

let novaViagem ={
codigo : proximoCodigo,
destino: destino,
distancia : distancia,
passageiros : passageiros,
valor: valorPorPessoa,
total : valorTotal
};
listaDeViagens.push(novaViagem);
proximoCodigo = proximoCodigo + 1;
renderizarTabela();
atualizarDashboard();
limparFormulario();

}
function renderizarTabela (){
  let corpoTabela = document.getElementById('tabela');
  corpoTabela,innerHTML = "";

  for(let i = 0; i < listaDeViagens.length; i = i +1){
    let viagem = listaDeViagens[i];
  
    let linha = `
  
   <tr>
          <td>${viagem.codigo}</td>
          <td>${viagem.destino}</td>
          <td>${viagem.distancia}</td>
          <td>${viagem.passageiros}</td>
          <td>R$ ${viagem.valor.toFixed(2)}</td>
          <td>R$ ${viagem.total.toFixed(2)}</td>
        </tr>
      `;
      corpoTabela.innerHTML += linha;
  }
}
function atualizarDashboard(){
  let totalDeViagens = listaDeViagens.length;
   let totalArrecadado = 0;
  for (let i = 0; i < listaDeViagens.length; i = i +1) {
    totalArrecadado = totalArrecadado + listaDeViagens[i].total;
  }
  let totalDePassageiros = 0;
  for (let i = 0; i < listaDeViagens.length; i = i +1) {
    totalDePassageiros = totalDePassageiros + listaDeViagens[i].passageiros;
  }
 
  
  document.getElementById("totalViagens").innerText    = totalDeViagens;
  document.getElementById("totalValor").innerText      = "R$ " + totalArrecadado.toFixed(2);
  document.getElementById("totalPassageiros").innerText = totalDePassageiros;
}
function limparFormulario() {
  document.getElementById("destino").value     = "";
  document.getElementById("distancia").value   = "";
  document.getElementById("passageiros").value = "";
  document.getElementById("valor").value       = "";
}

