//Definindo a lista de produtos
var listaProdutos = [
    {"produto":"Tijolo", "preco":1.31, "taxaIPI":0.08, "quantidade":0, "valorTotalProduto":0, "valorTotalIPI":0, "subtotal":0},
    {"produto":"Cimento", "preco":33.90, "taxaIPI":0.04, "quantidade":0, "valorTotalProduto":0, "valorTotalIPI":0, "subtotal":0},
    {"produto":"Telha", "preco":1.98, "taxaIPI":0.08, "quantidade":0, "valorTotalProduto":0, "valorTotalIPI":0, "subtotal":0}
];

var totais = {"totalValorProdutos":0, "totalValorIPI":0, "totalDesconto":0, "totalValorPedido":0};
var quantidadeTotalProdutos
const listaIndicesTotais = ["totalValorProdutos", "totalValorIPI","totalDesconto", "totalValorPedido"];
const listaTotais = ["Total dos produtos: ", "Total de Impostos: ","Total de desconto: ", "Total do pedido: "];

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

//Funcao para calcular o subtotal dos itens
function subtotalItem(indiceProduto){
    var totalProdutos = listaProdutos[indiceProduto].preco * listaProdutos[indiceProduto].quantidade;
    var totalIPI = totalProdutos*listaProdutos[indiceProduto].taxaIPI;
    var subtotal = totalProdutos+totalIPI;

    listaProdutos[indiceProduto].valorTotalProduto = totalProdutos;
    listaProdutos[indiceProduto].valorTotalIPI = totalIPI;
    listaProdutos[indiceProduto].subtotal = subtotal;
}

//Funcao para atualizar o carrinho de compras
function atualizaCarrinho(indiceProduto){
    listaElementosQuantidadeDeProdutos[indiceProduto].innerHTML = `<b>${listaProdutos[indiceProduto].quantidade} un.</b>`;
    subtotalItem(indiceProduto);
    listaElementosTabelaPrecoProduto[indiceProduto].innerHTML = formataPreco(listaProdutos[indiceProduto].subtotal)
    
    totais = {"totalValorProdutos":0, "totalValorIPI":0, "totalDesconto":0, "totalValorPedido":0};
    quantidadeTotalProdutos = 0;
    
    for(let contador = 0; contador < listaProdutos.length; contador++){
        quantidadeTotalProdutos += listaProdutos[contador].quantidade;
        totais["totalValorProdutos"] += listaProdutos[contador].valorTotalProduto;
        totais["totalValorPedido"] += listaProdutos[contador].subtotal;
        totais["totalValorIPI"] += listaProdutos[contador].valorTotalIPI;
    }
    if(totais["totalValorPedido"]>500){
    
        totais["totalDesconto"] = totais["totalValorPedido"]*0.05;
        totais["totalValorPedido"] -= totais["totalDesconto"];
    }else{

    }

    for(let contador = 0; contador < listaElementosTotais.length; contador++){
        listaElementosTotais[contador].innerHTML = `<b>${listaTotais[contador]}</b>${formataPreco(totais[listaIndicesTotais[contador]])}`;
    }

    if(quantidadeTotalProdutos>0){
        document.getElementById("carrinho__produtosNoCarrinho--vazio").style.display = "none";
        document.getElementById("carrinho__tabela").style.display = "inline-block";
    }else{
        document.getElementById("carrinho__produtosNoCarrinho--vazio").style.display = "inline-block";       
        document.getElementById("carrinho__tabela").style.display = "none";       
    }
}

//Funcao para adicionar 1 item
function adicionaQuantidade1(indiceProduto){
    var quantidade = listaProdutos[indiceProduto].quantidade += 1;
    atualizaCarrinho(indiceProduto, quantidade);
}

//Funcao para subtrair 1 item
function subtraiQuantidade1(indiceProduto){
    if(listaProdutos[indiceProduto].quantidade > 0){
        var quantidade = listaProdutos[indiceProduto].quantidade -= 1;
        atualizaCarrinho(indiceProduto, quantidade);
    } else{
        //pass
    }
}

//Funcao para adicionar 5 itens
function adicionaQuantidade5(indiceProduto){
    var quantidade = listaProdutos[indiceProduto].quantidade += 5;
    atualizaCarrinho(indiceProduto, quantidade);
}

//Funcao para subtrair 5 itens
function subtraiQuantidade5(indiceProduto){
    if(listaProdutos[indiceProduto].quantidade >= 5){
        var quantidade = listaProdutos[indiceProduto].quantidade -= 5;
    } else{
        listaProdutos[indiceProduto].quantidade = 0;
    }
    atualizaCarrinho(indiceProduto, quantidade);
}

//Funcao para limpar um item do carrinho
function limparItemCarrinho(indiceProduto){
    var quantidade = 0;
    listaProdutos[indiceProduto].quantidade = 0;
    atualizaCarrinho(indiceProduto, quantidade);
}
//Funcao para limpar todo o carrinho
function limparCarrinho(){
    var quantidade = 0;
    for(let contador = 0; contador < listaProdutos.length; contador++){
        listaProdutos[contador].quantidade = 0;
        atualizaCarrinho(contador, quantidade);
    }
}

//Listas dos elementos da section produtos
const listaElementosNomesDeProdutos = document.querySelectorAll('.produto__nome');
const listaElementosPrecosDeProdutos = document.querySelectorAll('.produto__preco');
const listaElementosTaxaIpiDeProdutos = document.querySelectorAll('.produto__ipi');
const listaElementosQuantidadeDeProdutos = document.querySelectorAll('.produto__quantidade');

//Lista dos botoes da section produtos 
const listaBotoesAdiciona1 = document.querySelectorAll('.adiciona1');
const listaBotoesSubtrai1 = document.querySelectorAll('.subtrai1');

const listaBotoesAdiciona5 = document.querySelectorAll('.adiciona5');
const listaBotoesSubtrai5 = document.querySelectorAll('.subtrai5');

const listaElementosTotais = document.querySelectorAll(".carrinho__totais");

for(let contador = 0; contador < listaProdutos.length; contador++){
    //Definicao dos elementos iniciais da pagina
    listaElementosNomesDeProdutos[contador].innerHTML = listaProdutos[contador].produto;
    listaElementosPrecosDeProdutos[contador].innerHTML = `<b>Preço Un: </b>${formataPreco(listaProdutos[contador].preco)}`;
    listaElementosTaxaIpiDeProdutos[contador].innerHTML = `<b>Taxa IPI: </b>${formataIPI(listaProdutos[contador].taxaIPI)}`;
    listaElementosQuantidadeDeProdutos[contador].innerHTML = `<b>${listaProdutos[contador].quantidade} un.</b>`;
    
    //Definicao das funcoes dos botoes adiciona e subtrai
    listaBotoesAdiciona1[contador].onclick = function(){
        adicionaQuantidade1(contador);
    };
    
    listaBotoesSubtrai1[contador].onclick = function(){
        subtraiQuantidade1(contador);
    };
    
    listaBotoesAdiciona5[contador].onclick = function(){
        adicionaQuantidade5(contador);
    };
    
    listaBotoesSubtrai5[contador].onclick = function(){
        subtraiQuantidade5(contador);
    };
    document.getElementById("carrinho__tabelaLinhas").innerHTML +=
    `<tr>
    <td class="carrinho__tabelaNomeProduto">${listaProdutos[contador].produto}</td>
    <td class="carrinho__tabelaPrecoProduto">R$ 0,00</td>
    <td>
            <button class="carrinho__botaoLimparItemCarrinho">Limpar</button>
        </td>`;
    }
    
    const listaElementosTabelaPrecoProduto = document.querySelectorAll(".carrinho__tabelaPrecoProduto");
    const listaBotoesLimparQuantidadeItens = document.querySelectorAll(".carrinho__botaoLimparItemCarrinho");
    
    for(let contador = 0; contador < listaBotoesLimparQuantidadeItens.length; contador++){
        listaBotoesLimparQuantidadeItens[contador].onclick = function(){
            limparItemCarrinho(contador);
        }
    }

    for(let contador = 0; contador < listaElementosTotais.length; contador++){
        listaElementosTotais[contador].innerHTML = `<b>${listaTotais[contador]}</b>${formataPreco(0)}`;
    }

    document.getElementById("carrinho__botaoLimparCarrinho").onclick = function(){
        limparCarrinho();
    }