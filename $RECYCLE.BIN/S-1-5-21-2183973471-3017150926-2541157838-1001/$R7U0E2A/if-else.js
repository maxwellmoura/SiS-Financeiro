let saldo = 500

document.getElementById("btnSacar").addEventListener("click", () => {
    const valorInput = document.getElementById("valorSaque")
    const mensagem = document.getElementById("mensagem")
    const valor = parseFloat(valorInput.value)

    if (isNaN(valor) || valor <= 0) {
        mensagem.textContent = "Valor inválido! Digite um valor maior que zero."
        mensagem.style.color = "red"
    } else if (valor > saldo) {
        mensagem.textContent = "Saldo insuficiente"
        mensagem.style.color = "yellow"
    } else if (valor % 10 !== 0) {
        mensagem.textContent = "O valor deve ser múltiplo de 10."
        mensagem.style.color = "orange"
    } else {
        saldo -= valor;
        document.getElementById("saldo").textContent = saldo;
        mensagem.textContent = `Saque de R$${valor} realizado com sucesso!`;
        mensagem.style.color = "green";
    }
    valorInput.value = ""
})