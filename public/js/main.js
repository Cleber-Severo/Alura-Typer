var frase = $(".frase").text();
var numeroPalavras = frase.split(" ").length;
var tamanhoFrase = $('#tamanho-frase')

console.log(tamanhoFrase);

tamanhoFrase.text(numeroPalavras)