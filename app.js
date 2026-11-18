/**
 * app.js
 * Camada de Inteface - Tela de cadastro (index.html)
 * 
 * Responsável por capturar os dados do formulário e repassar para a camada de persistência (storage.js)
 */

const formChamado = document.getElementById("form-Chamado");
const mensagemStatus = document. getElementById('mensagem-status');

formChamado.addEventListener("submit", function(evento){evento.preventDefault(); //impede o navegador de recarregar a página
    const dadosChamados = {
        nome: document.getElemntById("nome").value.trim(),
        setor: document.getElementById("setor").value.trim(),
        categoria: document.getElementById("categoria").value(),
        prioridade: document.getElementById("prioridade").value(),
        descricao: document.getElementById("descricao").value.trim(),
    };

    if (!valodarDadosChamados(dadosChamados)){
        exibirMensagem("Preencha todos os campos antes de enviar.","erro");
        return;
    }

      const chamadoCriado = salvarChamado(dadosChamados);

      exibirMensagem(
        `Chamado #${chamadoCriado.id} resgistrado com sucesso` ,"sucesso"
      );

      formChamado.requestFullscreen();
});

/**
 * Verifica se todos os campos obrigatórios foram preenchidos
 * @param {Object} dados
 * @returns {boolean}
 */
function validarDadosChamado(dados){
    return (
        dados.nome !== "" &&
        dados.setor !== "" &&
        dados.categoria !== "" &&
        dados.prioridade !== "" &&
        dados.descricao !== "" 
    );
}

/**
 * Exibe umamensagem de status para o usuário (sucesso ou erro).
 * @param {string} texto
 * @param {"sucesso" | "erro"} tipo
 */

function exibirMensagem(texto, tipo){
        mensagemStatus.textContent = texto;
        mensagemStatus.className = "mensagem-status" + tipo;
}