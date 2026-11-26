/**
 * storage.js
 * Camada de Persistência local - HelpDesk Escolar
 *
 * Responsável por salvar, listar, atualizar e filtrar chamados usando o localStorage do navegador.
 */

const CHAVE_STORAGE = "chamados";

/**
 * Busca todos os chamados salvos no localStorage.
 * @returns {Array} lista de chamados (vazia se não houver nada salvo)
 */
function listarChamados() {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
}

/**
 * Salva a lista completa de chamados no localStorage.
 * @param {Array} chamados
 */
function salvarListaCompleta(chamados) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(chamados));
}

/**
 * Gera um novo ID incremental para o chamado.
 * @returns {number}
 */
function gerarNovoID() {
    const chamados = listarChamados();
    if (chamados.length === 0) return 1;
    const maiorId = Math.max(...chamados.map((c) => c.id));
    return maiorId + 1;
}

/**
 * Cadastra um novo chamado.
 * @param {Object} dadosChamado - { nome, setor, categoria, descricao, prioridade }
 * @returns {Object} o chamado criado, com id, status e dataCriacao preenchidos
 */
function salvarChamado(dadosChamado) {
    const chamados = listarChamados();

    const novoChamado = {
        id: gerarNovoID(),
        nome: dadosChamado.nome,
        setor: dadosChamado.setor,
        categoria: dadosChamado.categoria,
        descricao: dadosChamado.descricao,
        prioridade: dadosChamado.prioridade,
        status: "Aberto",
        dataCriacao: new Date().toISOString(),
    };

    chamados.push(novoChamado);
    salvarListaCompleta(chamados);

    return novoChamado;
}

/**
 * Atualiza o status de um chamado existente.
 * @param {number} id
 * @param {string} novoStatus - "Aberto" | "Em andamento" | "Resolvido"
 * @returns {boolean} true se encontrou e atualizou, false caso contrário
 */
function atualizarStatus(id, novoStatus) {
    const chamados = listarChamados();
    const chamado = chamados.find((c) => c.id === id);

    if (!chamado) {
        console.warn(`Chamado com id ${id} não encontrado.`);
        return false;
    }

    chamado.status = novoStatus;
    salvarListaCompleta(chamados);
    return true;
}

/**
 * Filtra os chamados por status.
 * @param {string} status - "Aberto" | "Em andamento" | "Resolvido" | "Todos"
 * @returns {Array}
 */
function filtrarPorStatus(status) {
    const chamados = listarChamados();

    if (!status || status === "Todos") {
        return chamados;
    }
    return chamados.filter((c) => c.status === status);
}

/**
 * Remove um chamado pelo id (função extra, útil para testes).
 * @param {number} id
 * @returns {boolean}
 */
function removerChamado(id) {
    const chamados = listarChamados();
    const listaAtualizada = chamados.filter((c) => c.id !== id);

    if (listaAtualizada.length === chamados.length) {
        console.warn(`Chamado com id ${id} não encontrado.`);
        return false;
    }

    salvarListaCompleta(listaAtualizada);
    return true;
}

/**
 * Limpa todos os chamados (função extra, útil para resetar testes).
 */
function limparTodosChamados() {
    localStorage.removeItem(CHAVE_STORAGE);
}