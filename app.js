let listaDeNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


//FUNÇÃO PARA EXIBIR TEXTO NA TELA
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//FUNÇÃO PARA EXIBIR TEXTO NA TELA
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    
}

exibirMensagemInicial();

//FUNÇÃO GERAR NÚMERO ALEATORIO
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteado = []; 
    }
    
    if(listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumeroSorteado.push(numeroEscolhido);
        console.log(listaDeNumeroSorteado);
        return numeroEscolhido;
    }

}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    //TESTE DE CHUTE 
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? ' tentativas.' : ' tentativa.';
        let mensagemTentativas = 'Você descobriu o número secreto com ' +tentativas+ palavraTentativas;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');   
    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        //LIMPAR CAMPO E CONTADOR DE TENTATIVA
        tentativas ++;
        limparCampo();
    }

}



//FUNÇÃO PARA LIMPAR O CAMPO DE CHUTE
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//FUNÇÃO PAR REINICIAR O JOGO
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1; 
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}