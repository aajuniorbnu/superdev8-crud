
const form = document.getElementById("product-form");
const categoriaProduto = document.getElementById("product-id");
const nomeProduto = document.getElementById("nome");
const precoProduto = document.getElementById("preco");
const quantidadeProduto = document.getElementById("quantidade");
const tableBody = document.getElementById("product-table-body");
const botaoCancelar = document.getElementById("cancel-button");
const botaoSalvar = document.getElementById("save-button");

let produtos = [];
let codigoAtual = 1;

function obterCategoriaSelecionada() {
  const categoria = document.querySelector('input[name="categoria"]:checked');
  return categoria ? categoria.value : "";
}

function selecionarCategoria(valor) {
  const radio = document.querySelector(`input[name="categoria"][value="${valor}"]`);
  if (radio) radio.checked = true;
}

function limparCategoria() {
  const categoria = document.querySelector('input[name="categoria"]:checked');
  if (categoria) categoria.checked = false;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcularValorTotal(preco, quantidade) {
  return preco * quantidade;
}

function limparFormulario() {
  form.reset();
  categoriaProduto.value = "";
  limparCategoria();
  botaoSalvar.textContent = "Salvar";
}

function preencherFormulario(produto) {
  categoriaProduto.value = produto.codigo;
  nomeProduto.value = produto.nome;
  precoProduto.value = produto.preco;
  quantidadeProduto.value = produto.quantidade;
  selecionarCategoria(produto.categoria);
  botaoSalvar.textContent = "Atualizar";
}

function renderizarTabela() {
  if (produtos.length === 0) {
    tableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">Nenhum produto cadastrado.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = produtos.map((produto) => `
    <tr>
      <td>${produto.codigo}</td>
      <td>${produto.nome}</td>
      <td><span class="chip">${produto.categoria}</span></td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.valorTotal)}</td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn btn-secondary" data-action="edit" data-id="${produto.codigo}">Editar</button>
          <button type="button" class="btn btn-danger" data-action="delete" data-id="${produto.codigo}">Excluir</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function salvarProduto(event) {
  event.preventDefault();

  const nome = nomeProduto.value.trim();
  const categoria = obterCategoriaSelecionada();
  const preco = Number(precoProduto.value);
  const quantidade = Number(quantidadeProduto.value);

  if (!nome || !categoria || preco < 0 || quantidade < 0) return;

  const valorTotal = calcularValorTotal(preco, quantidade);
  const codigoEdicao = Number(categoriaProduto.value);

  if (codigoEdicao) {
    produtos = produtos.map((produto) =>
      produto.codigo === codigoEdicao
        ? { ...produto, nome, categoria, preco, quantidade, valorTotal }
        : produto
    );
  } else {
    produtos.push({
      codigo: codigoAtual++,
      nome,
      categoria,
      preco,
      quantidade,
      valorTotal
    });
  }

  renderizarTabela();
  limparFormulario();
}

function editarProduto(codigo) {
  const produto = produtos.find((item) => item.codigo === codigo);
  if (!produto) return;

  preencherFormulario(produto);
  nomeProduto.focus();
}

function excluirProduto(codigo) {
  produtos = produtos.filter((item) => item.codigo !== codigo);
  renderizarTabela();

  if (Number(categoriaProduto.value) === codigo) {
    limparFormulario();
  }
}

form.addEventListener("submit", salvarProduto);
botaoCancelar.addEventListener("click", limparFormulario);

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const codigo = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "edit") editarProduto(codigo);
  if (action === "delete") excluirProduto(codigo);
});

renderizarTabela();
