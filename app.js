/**
 * app.js
 * Camada de interface - tela de abertura de chamado (index.html)
 */

const formChamado = document.getElementById("form-chamado");
const mensagemStatus = document.getElementById("mensagem-status");

formChamado.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const setor = document.getElementById("setor").value.trim();
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !setor || !categoria || !prioridade || !descricao) {
        exibirMensagem("Por favor, preencha todos os campos obrigatórios.", "erro");
        return;
    }

    const chamadoCriado = salvarChamado({
        nome,
        setor,
        categoria,
        prioridade,
        descricao,
    });

    formChamado.reset();
    exibirMensagem(
        `Chamado #${chamadoCriado.id} registrado com sucesso!`,
        "sucesso"
    );
});

function exibirMensagem(texto, tipo) {
    mensagemStatus.textContent = texto;
    mensagemStatus.className = `mensagem-status ${tipo}`;
}