/* Programa feito por André Paiva Rodrigues e Pedro Augusto em 22/07/2018 para a disciplina ENGA47 -  Tecnologia dos Materiais 
    para a Engenharia Elétrica da UFBA, ministrada pelo professor Tiago Trindade Ribeiro 
    
    Obs.: Esse código está bem feio. Poderia ter ficado mais bonito, porém faltou tempo.*/

let listaValores1 = new Array();
let listaValores2 = new Array();
let cont1 = 1;
let cont2 = 1;

const CONSTANTE_DIELETRICA_VACUO = 8.85 * Math.pow(10, -12);

function adicionarCamada1() {
    let x = document.querySelector("#constanteDieletrica").value;
    x = x.replace(",", ".");
    listaValores1.push({x: x, id: cont1});
    cont1++;
    reloadListValores1();
    document.querySelector("#constanteDieletrica").value = '';
}

function adicionarCamada2() {
    let x = document.querySelector("#capacitancia").value;
    x = x.replace(",", ".");
    listaValores2.push({x: x, id: cont2});
    cont2++;
    reloadListValores2();
    document.querySelector("#capacitancia").value = '';
}

function reloadListValores1() { 
    clearDiv1();
    if (listaValores1.length > 0) {
        let table = '<table class="tabela table-striped table-condensed table-responsive"<tbody><tr><th>Número</th><th>Constante Dielétrica</th><th>Ação</th></tr>';
        listaValores1.forEach(element => {
        let a = '<tr><td>' + element.id + '</td><td>';
        a += element.x + '</td>';
        a += '<td><button onclick="deletePoint1(\'' + element.id + '\')">Remover</button></td>'
        table += a; 
    });
    table += '</tbody></table>';
    document.querySelector("#tabela1").innerHTML = table;
    }
}

function reloadListValores2() { 
    clearDiv2();
    if (listaValores2.length > 0) {
        let table = '<table class="tabela table-striped table-condensed table-responsive"<tbody><tr><th>Número</th><th>Capacitância</th><th>Ação</th></tr>';
        listaValores2.forEach(element => {
        let a = '<tr><td>' + element.id + '</td><td>';
        a += element.x + '</td>';
        a += '<td><button onclick="deletePoint2(\'' + element.id + '\')">Remover</button></td>'
        table += a; 
    });
    table += '</tbody></table>';
    document.querySelector("#tabela2").innerHTML = table;
    }
}

function clearDiv2() {
    document.querySelector("#tabela2").innerHTML = "";
}


function clearDiv1() {
    document.querySelector("#tabela1").innerHTML = "";
}

function deletePoint1(id) {
    listaValores1 = listaValores1.filter(element => element.id != id);
    reloadListValores1();
}

function deletePoint2(id) {
    listaValores2 = listaValores2.filter(element => element.id != id);
    reloadListValores2();
}

function calcular1() {
    let capacitanciaTotal = 0;
    const areaCamadas = document.querySelector("#areaCapacitor1").value.replace(",", ".");
    const distanciaCamadas = document.querySelector("#distanciaCamadas1").value.replace(",", ".");

    const numAreaCamadas = Number.parseFloat(areaCamadas) * Math.pow(10, -6);
    const numDistanciaCamadas = Number.parseFloat(distanciaCamadas) * Math.pow(10, -3);

    listaValores1.forEach(element => {
        let constante = Number.parseFloat(element.x);
        constante = constante * CONSTANTE_DIELETRICA_VACUO;
        let capacitanciaElemento = (constante * numAreaCamadas) / numDistanciaCamadas;
        capacitanciaTotal += capacitanciaElemento;
    });
    let potencia = Number.parseInt((capacitanciaTotal*Math.pow(10, -6)).toExponential().split('e')[1]).toString();
    document.querySelector("#resultado1").innerHTML = "<h2> A capacitância total do seu capacitor multi-camadas é " 
    + capacitanciaTotal.toExponential().substring(0, 5) + " x 10 ^" + potencia + " μF</h2>";
}

function calcular2() {
    const areaCamadas = document.querySelector("#areaCapacitor2").value.replace(",", ".");
    const distanciaCamadas = document.querySelector("#distanciaCamadas2").value.replace(",", ".");

    const numAreaCamadas = Number.parseFloat(areaCamadas) * Math.pow(10, -6);
    const numDistanciaCamadas = Number.parseFloat(distanciaCamadas) * Math.pow(10, -3);

    let resultado = '<br>';

    listaValores2.forEach(element => {
        let capacitancia = Number.parseFloat(element.x) * Math.pow(10, 6);
        let constante = (capacitancia / numAreaCamadas) * numDistanciaCamadas; 
        let constanteR = constante / CONSTANTE_DIELETRICA_VACUO;
        resultado += "<h3>Para a Camada " + element.id + " de Capacitância " + element.x + "μF, a Constante Dielétrica deve ser " 
        + constanteR.toPrecision(2) + "</h3>";
    });
    resultado += '<br>';
    document.querySelector("#resultado2").innerHTML = resultado;
}