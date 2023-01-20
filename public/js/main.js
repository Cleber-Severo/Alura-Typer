var frase = $(".frase").text();
var numeroPalavras = frase.split(" ").length;
var tamanhoFrase = $('#tamanho-frase')
tamanhoFrase.text(numeroPalavras)

var campo = $('.campo-digitacao');
campo.on("input", () => {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $('#contador-caracteres').text(qtdCaracteres)
});

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