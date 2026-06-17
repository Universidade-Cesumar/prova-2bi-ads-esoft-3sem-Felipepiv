conts API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users'

// carregar a lista ao abrir a página do sistema

async function carregarMateriais() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error('Erro ao buscar dados.');

        const materiais = await res.json();

        renderizarLista(materiais);

    } catch (e) {

        document.getElementById('lista-materiais').innerHTML =
            `<p class="status" style="color:red;">⚠️ ${e.message}</p>`;
    }
}

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

function renderizarLista(materiais) {

    const lista = document.getElementById('lista-materiais');

    if (!materiais.length) {

        lista.innerHTML =
            '<p class="status">Nenhum material cadastrado ainda.</p>';

        return;
    }

    lista.innerHTML = materiais.map(item => `

        <div class="card">

            <h3>${item.produto || item.nome || 'Sem nome'}</h3>

            <p>
                Quantidade:
                <span>${item.quantidadeEstoque ?? item.quantidade ?? 0}</span>
            </p>

            <p>
                Cadastrado em:
                <span>${item.dataEntrada || '—'}</span>
            </p>

            <!-- ==================================== -->
            <!-- ADICIONADO SPRINT 2 -->
            <!-- ==================================== -->

            <input
                type="number"
                id="input-retirada"
                min="1"
                placeholder="Quantidade para retirar">

            <br><br>

            <button
                class="btn-baixar"
                onclick="baixarEstoque('${item.id}', ${item.quantidadeEstoque}, this)">
                Retirar
            </button>

            <button
                class="btn-excluir"
                onclick="excluirMaterial('${item.id}')">
                Excluir
            </button>

            <!-- FIM SPRINT 2 -->

        </div>

    `).join('');
}

document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const novoItem = {
        produto: document.getElementById('input-nome').value,
        quantidadeEstoque: Number(document.getElementById('input-quantidade').value),
        dataEntrada: new Date().toISOString().split('T')[0]
    };
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoItem)
        });
        if (!res.ok) throw new Error('Erro ao cadastrar.');
        
        alert('✅ Material cadastrado com sucesso!');
        this.reset();
        carregarMateriais();
    } catch (err) {
        alert('⚠️ Falha: ' + err.message);
    }
});

carregarMateriais();


