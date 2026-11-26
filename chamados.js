/**
 * chamados.js
 * Camada de interface - tela de listagem (chamados.html)
 *
 * Responsável por exibir os chamados, aplicar filtro por status
 * e permitir a alteração de status de cada chamado.
 */

const containerLista = document.getElementById("lista-chamados");
const mensagemVazia = document.getElementById("mensagem-vazia");
const filtroStatus = document.getElementById("filtro-status");

const STATUS_DISPONIVEIS = ["Aberto", "Em andamento", "Resolvido"];

// Renderiza a lista assim que a página carrega
document.addEventListener("DOMContentLoaded", renderizarLista);

// Sempre que o filtro mudar, renderiza a lista novamente
filtroStatus.addEventListener("change", renderizarLista);

/**
 * Busca chamados (já filtrados) e desenha os cartões na tela.
 */
function renderizarLista() {
    const statusSelecionado = filtroStatus.value;
    const chamados = filtrarPorStatus(statusSelecionado);

    containerLista.innerHTML = "";

    if (chamados.length === 0) {
        mensagemVazia.hidden = false;
        return;
    }
    mensagemVazia.hidden = true;

    // Mostrar os chamados mais recentes primeiro
    const chamadosOrdenados = [...chamados].reverse();

    chamadosOrdenados.forEach((chamado) => {
        containerLista.appendChild(criarCartaoChamado(chamado));
    });
}

/**
 * Cria o elemento HTML (cartão) que representa um chamado.
 * @param {Object} chamado
 * @returns {HTMLElement}
 */
function criarCartaoChamado(chamado) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-chamado";

    const dataFormatada = formatarData(chamado.dataCriacao);
    // Remove acentos para gerar a classe CSS (ex: "Média" -> "prioridade-media")
    const prioridadeNormalizada = chamado.prioridade
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const classePrioridade = `prioridade-${prioridadeNormalizada}`;

    cartao.innerHTML = `
        <div class="cartao-chamado-topo">
            <span class="numero-chamado">#${chamado.id}</span>
            <span class="badge-prioridade ${classePrioridade}">${chamado.prioridade}</span>
        </div>

        <h2 class="titulo-chamado">${chamado.categoria}</h2>
        <p class="descricao-chamado">${chamado.descricao}</p>

        <div class="detalhes-chamados">
            <span><strong>Solicitante:</strong> ${chamado.nome}</span>
            <span><strong>Setor:</strong> ${chamado.setor}</span>
            <span><strong>Aberto em:</strong> ${dataFormatada}</span>
        </div>

        <div class="rodape-chamado">
            <label class="rotulo-status" for="status-${chamado.id}">Status:</label>
            <select class="select-status" id="status-${chamado.id}" data-id="${chamado.id}">
                ${STATUS_DISPONIVEIS.map(
                    (status) =>
                        `<option value="${status}" ${status === chamado.status ? "selected" : ""}>${status}</option>`
                ).join("")}
            </select>
        </div>
    `;

    const seletorStatus = cartao.querySelector(".select-status");
    seletorStatus.addEventListener("change", aoMudarStatus);

    return cartao;
}

/**
 * Chamado quando o usuário troca o status pelo <select> do cartão.
 * @param {Event} evento
 */
function aoMudarStatus(evento) {
    const id = Number(evento.target.dataset.id);
    const novoStatus = evento.target.value;

    const sucesso = atualizarStatus(id, novoStatus);

    if (!sucesso) {
        alert("Não foi possível atualizar o status desse chamado.");
        return;
    }
    renderizarLista();
}

/**
 * Formata uma data ISO (dataCriacao) para o padrão dd/MM/yyyy HH:mm.
 * @param {string} dataIso
 * @returns {string}
 */
function formatarData(dataIso) {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}