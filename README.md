[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B74p-HKt)

# Sistema de Controle de Estoque – Enfermagem

## Sobre o Projeto

O Sistema de Controle de Estoque – Enfermagem foi desenvolvido para auxiliar no gerenciamento de materiais utilizados em um ambiente de saúde. O sistema permite cadastrar materiais, visualizar o estoque disponível, realizar baixas de estoque e excluir registros quando necessário.

A aplicação utiliza HTML, CSS e JavaScript para o desenvolvimento do front-end e a plataforma MockAPI para armazenamento e manipulação dos dados.

---

# Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* MockAPI.io
* Git e GitHub

---

# Funcionalidades

## Cadastro de Materiais

Permite adicionar novos materiais ao estoque através de um formulário contendo:

* Nome do material
* Quantidade inicial em estoque

Os dados são enviados para a API utilizando o método POST.

---

## Listagem de Materiais

Ao abrir a aplicação, os materiais cadastrados são carregados automaticamente através de uma requisição GET para a MockAPI.

Cada item é exibido em formato de cartão contendo:

* Nome do produto
* Quantidade disponível
* Data de entrada

---

## Baixa de Estoque

O sistema permite registrar a retirada de materiais do estoque.

Para isso:

1. O usuário informa a quantidade a ser retirada.
2. O sistema valida a operação.
3. A quantidade é descontada do estoque.
4. A data e a quantidade da saída são registradas.

A atualização é realizada através de uma requisição PUT.

---

## Exclusão de Materiais

Cada material possui um botão de exclusão.

Ao clicar em "Excluir":

* O sistema solicita confirmação.
* O registro é removido da MockAPI.
* A lista é atualizada automaticamente.

A exclusão é realizada através de uma requisição DELETE.

---

# Regras de Negócio

Foi implementada a função:

```javascript
function validarRetirada(estoqueAtual, quantidadeRetirada)
```

Responsável por validar as operações de retirada.

A função impede:

* Quantidades menores ou iguais a zero.
* Quantidades superiores ao estoque disponível.

Retornos:

* true → retirada válida.
* false → retirada inválida.

---

# Estrutura da API

URL Base:

https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users

Métodos utilizados:

| Método | Função             |
| ------ | ------------------ |
| GET    | Listar materiais   |
| POST   | Cadastrar material |
| PUT    | Atualizar estoque  |
| DELETE | Excluir material   |

---

# Estrutura dos Dados

A MockAPI foi configurada com os seguintes campos:

| Campo             | Tipo      |
| ----------------- | --------- |
| id                | Object ID |
| ordem             | Number    |
| produto           | String    |
| dataEntrada       | Date      |
| dataValidade      | Date      |
| unidadeMedia      | String    |
| quantidadeEstoque | Number    |
| observacoes       | String    |
| dataSaida         | Date      |
| quantidadeSaida   | Number    |

---

# Interface do Sistema

A interface foi desenvolvida com foco na simplicidade e facilidade de uso.

Principais componentes:

* Cabeçalho informativo
* Formulário de cadastro
* Lista dinâmica de materiais
* Campo de retirada de estoque
* Botão de baixa de estoque
* Botão de exclusão

Além disso, o sistema possui layout responsivo para dispositivos móveis.

---

Requisitos implementados:

* Input para retirada de materiais (`input-retirada`)
* Botão de baixa (`btn-baixar`)
* Botão de exclusão (`btn-excluir`)
* Função de validação (`validarRetirada`)
* Atualização do estoque via PUT
* Exclusão de materiais via DELETE
* Bloqueio de retiradas inválidas
* Atualização automática da interface após alterações

Todos os requisitos da Sprint 2 foram atendidos conforme especificado.

---

# Autor

Felipe Silva

Curso: Engenharia de Software

SENAC Zona Norte

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Web.

