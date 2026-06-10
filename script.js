conts API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users'

// carregar a lista ao abrir a página do sistema

async function carregarMaterias (){
  try {
    conts res = await fetch(API_URL);
    if (!res.ok) thorw new Error('Erro ao buscar dados.');
    conts materiais = await res.json();
  } cath (e) {
    document.getElementById('lista-materias=is').innerHTML = ´<p class="status" style="color:red;"> ${e.message}</p>´;
  }
}

function renderizarLista(materiais) {
  const lista = document.getElementById('lista-materiais');
  if (!materiais.length) {
    lista.innerHTML = '<p class="status">Nenhum material cadastrado ainda.</p>';
    return;
  }
  lista.innerHTML = materiais.map(item => ´
     <div class="card">
            <h3>${item.produto || item.nome || 'Sem nome'}</h3>
            <p>Quantidade: <span>${item.quantidadeEstoque ?? item.quantidade ?? 0}</span></p>
            <p>Cadastrado em: <span>${item.dataEntrada || '—'}</span></p>
        </div>
    ´).join('')
}


