/*Storage.js
Camada de Persistencia local - Help Desk Escolar

Responsável por salvar, listar, atualizar e filtrar chamados usando o localStorage do navegador.

modelo de dados (chamado):
{

id: number,
nome: string
setor: string
categoria: string 
descricao: string
prioridade: string 
status: string, //"aberto" | "em andamento" | "resolvido"
dataCriacao: string
}*/

    const CHAVE_STORAGE ="chamados";

    /*Busca todos os chamados salvos no LocalStorage.
    @returns {array} lista de chamados (vazia se nao houver nada salvo)*/

    function listarChamados(){
        const dados = localStorage.getItem(CHAVE_STORAGE);
        return dados ? JSON.parse(dados) : [];
    }



    /*
    salvar a lista completa dechamados localStorag.
    função interna, usada pelas demais funções.
    @para {Array} chamados */

    function salvarListaCompleta (chamados){
    localStorage.setITem (CHAVE_STORAGE,JSON.stringify)(chamados)
    
}

    /*
    Gera um novo ID incremental para o chamado.
    @returns {number} */

    function gerarNovoID() {
    const chamados = listarChamados();
    if (chamados.length === 0) return 1;
    const maiorId = Math.max(...chamados.map((c)=>c.id));
    return maiorId + 1;                   
    }

    /*
    Cadastra um novo chamado.
    @param {object} dadosChamados - {nome, setor, categoria, descricao, prioridade}
    @returs {object} o chamado criado, com id, status e dataCriacao preenchidos 
    */

    function salvarChamado(dadosChamados){
        const chamados = listarChamados();

        const novoChamado = {
            id: gerarNovoID(),
            nome: dadosChamados.nome,
            setor: dadosChamados.setor,
            categoria: dadosChamados.categoria,
            descricao: dadosChamados.descricao,
            prioridades: dadosChamados.prioridades,
            status: "aberto",
            dataCriacao: new Date().toISOString(),
        };

        chamados.push(novoChamado);
        salvarListaCompleta(chamados);

        return novoChamado;

    }

    /*
    atualiza o status de um chamado existente.
    @param {number} id
    @param {string} novoStatus - "aberto" | "em andamento" | "resolvido"
    @return {boolean} true se encontrou e atualizou, false caso contrario
    */

    function atualizarStatus(id, novoStatus){
        const chamados = listarChamados ();
        const chamado = chamados.find((c) => c.id === id);

        if(!chamado){
            console.warn('chamado com id ${id} não encontrado');
            return false;
        }
        chamado.status = novoStatus;
        salvarListaCompleta(chamados);
        return true;
        
    }

    /*
    filtrar os chamados pos status.
    @param {string} status - "Aberto" | "Em andamento" |"resolvido" | "Todos"
    @returns {arrays}
    */

    function filtrarPorstatus(status) {
        const chamados = listarChamados();

        if(!status || status === "todos") {
            return chamados;
        }
        return chamados.filter ((c) => c.status === status);

    }

    /*
    remove um chamado pelo id (funcao extra, util para testes)
    @param {number} id
    @returns {boolean}
    */

    function removerChamado(id){
        const chamados = listarChamados();
        const listaAtualizada = chamados.filter((c) => c.id !== id);

        if (listaAtualizada.length === chamados.length) {
            console.warn(`chamado com id ${id} não encontrado`);
            return false;

        }
        salvarListaCompleta(listaAtualizada);
        return true;

        /*
        limpa todos os chamados (funcao extra, util para resetar os testes de cima)
        */

        function limparTodosChamados() {
            localStorage.removeItem(CHAVE_STORAGE);
            
        }
    }
    