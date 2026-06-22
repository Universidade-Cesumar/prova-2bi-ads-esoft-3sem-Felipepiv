const API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users'

// Guarda todos os materiais para filtro local
let todosMateriais = [];

// carregar a lista ao abrir a página do sistema

async function carregarMateriais() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error('Erro ao buscar dados.');

        todosMateriais = await res.json();

        renderizarLista(todosMateriais);
        atualizarDashboard(todosMateriais);

    } catch (e) {

        document.getElementById('lista-materiais').innerHTML =
            `<p class="status" style="color:red;">⚠️ ${e.message}</p>`;
    }
}

function atualizarDashboard(materiais) {
    const total = materiais.length;
    const criticos = materiais.filter(item => (item.qunatidadeEstoque ?? item.quantidade ?? 0) < 10).length;

    document.getElemenById('total-itens').textContent = total;
    document.getElementById('tital-criticos').textContent = criticos;
}

function filtrarMateriais(termo) {
    const termoLower = termo.toLowerCase();
    const filtrados = todosMateriais.filter(item => {
        const nome = (item.produto || item.nome || '').toLowerCase();
        return nome.includes(termoLower)
    });
    renderizarLista(filtrados);
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

    lista.innerHTML = materiais.map(item => {
        const quantidade = item.quantidadeEstoque ?? item.quantidade ?? 0;
 
        const classeCritico = quantidade < 10 ? 'estoque-critico' : '';
 
        return `
        <div class="card ${classeCritico}">
            <h3>${item.produto || item.nome || 'Sem nome'}</h3>
 
            <p>
                Quantidade:
                <span>${quantidade}</span>
                ${quantidade < 10 ? '<span class="badge-critico">⚠️ Estoque baixo</span>' : ''}
            </p>
 
            <p>
                Cadastrado em:
                <span>${item.dataEntrada || '—'}</span>
            </p>
 
            <input
                type="number"
                id="input-retirada"
                class="input-retirada-card"
                min="1"
                placeholder="Quantidade para retirar">
 
            <br><br>
 
            <button
                class="btn-baixar"
                onclick="baixarEstoque('${item.id}', ${quantidade}, this)">
                Retirar
            </button>
 
            <button
                class="btn-excluir"
                onclick="excluirMaterial('${item.id}')">
                Excluir
            </button>
        </div>
        `;
    }).join('');
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

async function baixarEstoque(id, estoqueAtual, botao) {

    const card = botao.closest('.card');

    const quantidadeRetirada = Number(
        card.querySelector('#input-retirada').value
    );

    if (
        !validarRetirada(
            estoqueAtual,
            quantidadeRetirada
        )
    ) {

        alert(
            'Quantidade inválida. Não é permitido retirar valores negativos ou maiores que o estoque.'
        );

        return;
    }

    const novoEstoque =
        estoqueAtual - quantidadeRetirada;

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                quantidadeEstoque: novoEstoque,

                // ADICIONADO
                quantidadeSaida: quantidadeRetirada,

                // ADICIONADO
                dataSaida: new Date()
                    .toISOString()
                    .split('T')[0]

            })

        });

        if (!res.ok) {
            throw new Error(
                'Erro ao atualizar estoque.'
            );
        }

        alert('✅ Baixa realizada com sucesso!');

        carregarMateriais();

    } catch (erro) {

        alert('⚠️ ' + erro.message);

    }
}

async function excluirMaterial(id) {

    const confirmar = confirm(
        'Deseja realmente excluir este material?'
    );

    if (!confirmar) return;

    try {

        const res = await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'

        });

        if (!res.ok) {

            throw new Error(
                'Erro ao excluir material.'
            );

        }

        alert(
            '🗑️ Material excluído com sucesso!'
        );

        carregarMateriais();

    } catch (erro) {

        alert('⚠️ ' + erro.message);

    }
}



carregarMateriais();


