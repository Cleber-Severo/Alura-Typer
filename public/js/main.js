var tempoInicial = $('#tempo-digitacao').text();
var frase = $(".frase").text();
var campo = $('.campo-digitacao');
var reiniciarBtn = $('#botao-reiniciar');
// $ = $(document).ready()
$(() => {
    console.log('inicializou');
    atualizaTamanhoFrase();
    inicializaCronometro();
    inicializaContadores();
    inicializaMarcadores();
    reiniciarBtn.click(reiniciaJogo)
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
    reiniciarBtn.attr('disabled', true);
    
    campo.one('focus', () => {


        var cronometroId =  setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            console.log(tempoRestante);
    
            if(tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000)
    })

}

function finalizaJogo() {
    campo.attr('disabled', true);   
    reiniciarBtn.attr('disabled', false);  
    campo.toggleClass('campo-desativado');
    inserePlacar()
}

function inicializaMarcadores() {
    var fraseComparavel = $('.frase').text();
    campo.on('input', () => {

        var digitado = campo.val();
        var comparavel = fraseComparavel.substr(0,digitado.length);
        
        if (fraseComparavel.startsWith(digitado)) {
            campo.addClass('borda-verde');
            campo.removeClass('borda-vermelha');
        } else {
            campo.addClass('borda-vermelha');
            campo.remove('borda-verde');
        }

    });
}


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Cléber";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

     var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";

    corpoTabela.prepend(linha);

}

$('.botao-remover').click(function(e) {
    e.preventDefault();
    $(this).parent().parent().remove();
})

function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass('campo-desativado');
    campo.remove('borda-verde');
    campo.removeClass('borda-vermelha');
}

