var tempoInicial = $('#tempo-digitacao').text();
var frase = $(".frase").text();
var campo = $('.campo-digitacao');

// $ = $(document).ready()
$(() => {
    console.log('inicializou');
    atualizaTamanhoFrase();
    inicializaCronometro();
    inicializaContadores();
    $('#botao-reiniciar').click(reinicia)
})



function inicializaContadores() {
    
    campo.on("input", () => {
        
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres)

    });

}

function atualizaTamanhoFrase() {

    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $('#tamanho-frase')

    tamanhoFrase.text(numeroPalavras)
}

function inicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text();

    campo.one('focus', () => {
        var cronometroId =  setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            console.log(tempoRestante);
    
            if(tempoRestante < 1) {
                campo.attr('disabled', true);
                clearInterval(cronometroId);
            }
        }, 1000)
    })

}


function reinicia() {
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
}

