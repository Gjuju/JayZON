let header = document.querySelector('#title'); //les 3 zones de texte à peupler
let article = document.querySelector('#text');
let possib = document.querySelector('#possib');

possib.addEventListener("click", click); // event listener sur la section contenant des boutons


let currentpage = ""; // la page courante


function click(event) { // Fonction qui surveille les clicks et renvoi vers changepage(button.value);
    const button = event.target;
    if (button.tagName == 'BUTTON') { // makes sure this click interests us
        changepage(button.value);
    }
}


let requestURL = './super.json'; // la requette de récupération du JSON /!\ ici en local, peut etre une url
request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () { // au chargement : peuplement de la page Header / Article / Section
    histoire = request.response; // stockage du JSON
    //console.log(histoire);              // console.log du json pour la structure.
    if (currentpage == "") {
        currentpage = 0;
    }
    
    populateHeader(currentpage);
    PopulateArticle(currentpage);
    PopulateSection(currentpage);
}


function populateHeader() { // peuplement du H1 Header
    let myTitle = document.createElement('h1');
    myTitle.textContent = histoire.title;
    header.appendChild(myTitle);
}


function PopulateArticle(curpage) { // peuplement du corps de l'histoire
let myDiv = document.createElement("div");
myDiv.className = "article";
article.innerHTML = "";

for (i = 0; i < histoire.pages[curpage].text.length; i++) {
        let myText = document.createElement('H5');
        myText.textContent = histoire.pages[curpage].text[i].para;
        article.appendChild(myDiv);
        myDiv.appendChild(myText);
    }
}

function PopulateSection(curpage) {  // Peuplement des possibilités , texte choix et boutons.
    possib.innerHTML = ""; // permet d'effacer avant de re-remplir
    if (histoire.pages[curpage].link.length > 0) {
        divide = 12 / (histoire.pages[curpage].link.length);
    } else {
        divide = 12;
    }
    let myDiv1 = document.createElement('div'); // créer une div class 'row'
    
    myDiv1.className = 'col-12';
    //myDiv1.setAttribute('id', 'container');

    let myDiv2 = document.createElement('div'); // créer une div class 'row'
    myDiv2.className = 'row';
    
    for (i = 0; i < histoire.pages[curpage].link.length; i++) {

        let myDiv3 = document.createElement('div'); // créer une div class='col-x'
        myDiv3.className = 'col-' + divide;

        let myPos = document.createElement('p'); // créer un texte dans la div col
        myPos.textContent = histoire.pages[curpage].link[i].choice;
        
        let myChoice = document.createElement('BUTTON'); // créer un bouton dans la div
        gotoPage = histoire.pages[curpage].link[i].toPage;
        myChoice.setAttribute('type', 'button'); // set button type
        myChoice.setAttribute('id', 'button' + i); // set button Id
        myChoice.setAttribute('value', histoire.pages[curpage].link[i].toPage); // récupre value=lien vers page /!\ il faut maintenant faire un onclick vers changepage(toPage) 
        myChoice.innerHTML = "Choisir";                                                             // !!! à let curpage = 0; en tout début de code

        myDiv1.appendChild(myDiv2); // peupler la section/div id="possib" avec cette div
        myDiv2.appendChild(myDiv3); // peupler la section/div id="possib" avec cette div
        myDiv3.appendChild(myPos); // peupler cette div avec un P de texte
        myDiv3.appendChild(myChoice); // y ajouter un bouton
    }

    possib.appendChild(myDiv1); // peupler la section/div id="possib" avec cette div
    
}


function changepage(gotopage) {
    currentpage = gotopage;
    PopulateArticle(currentpage);
    PopulateSection(currentpage);
}



