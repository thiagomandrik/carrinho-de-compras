//Definindo a lista de produtos
var listaProdutos = [
    {"produto":"Tijolo", "preco":1.31, "taxaIPI":0.08, "quantidade":0},
    {"produto":"Cimento", "preco":33.90, "taxaIPI":0.08, "quantidade":0},
    {"produto":"Telha", "preco":1.98, "taxaIPI":0.08, "quantidade":0}
];

//Funcao para formatar os precos em R$
function formataPreco(preco){
    var precoFormatado = String(preco);
    precoFormatado = parseFloat(precoFormatado).toFixed(2) + "";
	precoFormatado = precoFormatado.replace(".",",");
	precoFormatado = "R$ " + precoFormatado;
	return precoFormatado;
}

//Funcao para formatar os percentuais de IPI
function formataIPI(taxaIPI){
    var ipiFormatado = String(parseFloat(taxaIPI*100).toFixed(2));
    ipiFormatado = ipiFormatado.replace(".",",");
	ipiFormatado = ipiFormatado + "%";
	return ipiFormatado;
}


function adicionaQuantidade(indiceProduto){
    listaProdutos[indiceProduto].quantidade += 1;
    listaElementosQuantidadeDeProdutos[indiceProduto].innerHTML = `<b>${listaProdutos[indiceProduto].quantidade} und.</b>`;
}

function subtraiQuantidade(indiceProduto){
    if(listaProdutos[indiceProduto].quantidade >0){
        listaProdutos[indiceProduto].quantidade -= 1;
        listaElementosQuantidadeDeProdutos[indiceProduto].innerHTML = `<b>${listaProdutos[indiceProduto].quantidade} und.</b>`;
    } else{
        //pass
    }
}

//Listas dos elementos da section produtos
const listaElementosNomesDeProdutos = document.querySelectorAll('.produto__nome');
const listaElementosPrecosDeProdutos = document.querySelectorAll('.produto__preco');
const listaElementosTaxaIpiDeProdutos = document.querySelectorAll('.produto__ipi');
const listaElementosQuantidadeDeProdutos = document.querySelectorAll('.produto__quantidade');

//Lista dos botoes da section produtos 
const listaBotoesAdiciona = document.querySelectorAll('.adiciona');
const listaBotoesSubtrai = document.querySelectorAll('.subtrai');

for(let contador = 0; contador < listaProdutos.length; contador++){
    //Definicao dos elementos iniciais da pagina
    listaElementosNomesDeProdutos[contador].innerHTML = listaProdutos[contador].produto;
    listaElementosPrecosDeProdutos[contador].innerHTML = `<b>Preço Un: </b>${formataPreco(listaProdutos[contador].preco)}`;
    listaElementosTaxaIpiDeProdutos[contador].innerHTML = `<b>Taxa IPI: </b>${formataIPI(listaProdutos[contador].taxaIPI)}`;
    listaElementosQuantidadeDeProdutos[contador].innerHTML = `<b>${listaProdutos[contador].quantidade} und.</b>`;
    
    //Definicao das funcoes dos botoes adiciona e subtrai
    listaBotoesAdiciona[contador].onclick = function(){
        adicionaQuantidade(contador);
    };

    listaBotoesSubtrai[contador].onclick = function(){
        subtraiQuantidade(contador);
    };
    
}

