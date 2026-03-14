let filmes = []
let codigoFilme = 1

function salvar(){

let codigo = document.getElementById("codigo").value
let nome = document.getElementById("nome").value
let genero = document.getElementById("genero").value
let duracao = document.getElementById("duracao").value
let nota = document.getElementById("nota").value
let cinema = document.getElementById("cinema").checked

let classificacao = ""

if(nota < 5){
classificacao = "Ruim"
}
else if(nota <= 7){
classificacao = "Regular"
}
else{
classificacao = "Bom"
}

if(codigo == ""){

let filme = {
codigo: codigoFilme,
nome: nome,
genero: genero,
duracao: duracao,
nota: nota,
classificacao: classificacao,
cinema: cinema ? "Sim" : "Não"
}

filmes.push(filme)

codigoFilme = codigoFilme +1

}
else{

for(let i = 0; i < filmes.length; i = i+1){

if(filmes[i].codigo == codigo){

filmes[i].nome = nome
filmes[i].genero = genero
filmes[i].duracao = duracao
filmes[i].nota = nota
filmes[i].classificacao = classificacao
filmes[i].cinema = cinema ? "Sim" : "Não"

}

}

}

limparCampos()
listar()

}

function listar(){

let tabela = document.getElementById("tabelaFilmes")

tabela.innerHTML = ""

for(let i = 0; i < filmes.length; i++){

let linha = `
<tr>

<td>${filmes[i].codigo}</td>
<td>${filmes[i].nome}</td>
<td>${filmes[i].genero}</td>
<td>${filmes[i].duracao} min</td>
<td>${filmes[i].nota}</td>
<td>${filmes[i].classificacao}</td>
<td>${filmes[i].cinema}</td>

<td>

<button class="acao editar" onclick="editar(${filmes[i].codigo})">Editar</button>

<button class="acao excluir" onclick="excluir(${filmes[i].codigo})">Excluir</button>

</td>

</tr>
`

tabela.innerHTML += linha

}

}

function editar(codigo){

for(let i = 0; i < filmes.length; i++){

if(filmes[i].codigo == codigo){

document.getElementById("codigo").value = filmes[i].codigo
document.getElementById("nome").value = filmes[i].nome
document.getElementById("genero").value = filmes[i].genero
document.getElementById("duracao").value = filmes[i].duracao
document.getElementById("nota").value = filmes[i].nota
document.getElementById("cinema").checked = filmes[i].cinema == "Sim"

}

}

}

function excluir(codigo){

for(let i = 0; i < filmes.length; i++){

if(filmes[i].codigo == codigo){

filmes.splice(i,1)

}

}

listar()

}

function limparCampos(){

document.getElementById("codigo").value = ""
document.getElementById("nome").value = ""
document.getElementById("genero").value = ""
document.getElementById("duracao").value = ""
document.getElementById("nota").value = ""
document.getElementById("cinema").checked = false

}