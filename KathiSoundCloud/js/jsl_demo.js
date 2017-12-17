//soll auf Kachelansicht umschalten, nochmaliger soll den class-Wert entfernen um zur Liste zurück zukommen

var ul;  //global

function initialiseView() {
    //alert ("initiliseView()!")
    var header = document.getElementsByTagName("header")[0];/*auslesen*/
    var main = document.querySelector("main");/*auslesen*//*=toast, das was geblendet wird , !!!!*/
    var thumbnails = document.getElementsByClassName("thumbnails")[0];
    var body = document.getElementsByTagName("body")[0];

    main.classList.remove("faded");
    body.classList.remove("tiles"); /*Listenansicht beim ersten Laden*/

    thumbnails.onclick = function () {  /*Umblenden auf Kachelansicht mit 2s, Umblenden auf Listenansicht mit 1s*/
        if (body.classList.contains("tiles")) {
            /*body.classList.remove("tiles"); /*Listenansicht*/
            fadeOutList(event);
        } else {
            body.classList.add("tiles"); /*Kachelansicht*/
            fadeInList(event);
        }
    }
}

function finaliseTiles(event) {
    var tiles = event.target;
    tiles.classList.remove("list");
}
function finaliseList(event){
    var list=event.target;
    list.classList.remove("tiles");
}

function fadeOutList(event){     /*umblenden von Liste auf Kacheln*/
        var list=event.target;
        list.addEventListener("transitionend", finaliseTiles);
        list.removeEventListener("transitionend", fadeOutList);
        list.classList.remove("tiles");
}
function fadeInList(event){
    var tiles = event.target;
    tiles.addEventListener("transitionend", finaliseList);
    tiles.removeEventListener("transitionend",fadeOutTiles);
    tiles.classList.remove("list");
}






/*

    ul = document.getElementsByTagName("ul")[0];
    ul.onclick = function(event) {
        var liElement = getLiAncestorForElement(event.target);
        if (liElement) {
            alert("click on : " + getTextChildrenOfElementAsText(liElement));
        } else {
            alert("click: no li found! ");
        }
    }
        /*
         var lis = document.getElementsByTagName("li");
         for (var i=0; i<=lis.length;i++){
         var currentLi = lis[i];
         currentLi.onclick = function(event){
         alert("click on: " + getTextChildrenOfElementAsText(liElement));
         }.bind(currentLi)        //jede Funktion ist ein Objekt in js -> bind ermöglicht die Verwendung von this
         }
         */
/*
        var plus = document.getElementsByClassName("plus")[0];
        //plus = document. querySelector(".plus")  //Selector wie in css, noch besser wäre getElementByID!!!
        plus.onclick = (event) => { // Lambda-Notation, Verwendung von this, Deklaration einer anonymen Funktion
            event.stopPropagation();  //unterbindet das Bubbeling
            //alert("add new item!");
            addItemToList({name: "M" +(new Date()).getUTCMilliseconds(), src: "data/img/100_200.jpeg"});
    };
}

function addItemToList(item){   //ein neues Element unten anfügen an die Liste
    console.log("addItemToList", ul);
    console.log("addItemToList(): name: " +item.name);
    console.log("addItemToList(): src: " + item.src);
    console.log("addItemToList(): innerHTML: " + ul.innerHTML);
    //var newLi= "<li><div class=\"img align-left\" style=\"background-image: url('" + item.src + "')\"> </div>" + item.name + "<span class=\"align-right imgbutton edit\">edit</span></li>";
    //ul.innerHTML += newLi;
    // das von obendrüber anders:

    //the list item
    var newLi = document.createElement("li");

    //the image
    var imgDiv = document.createElement("div");  //Kind von li
    newLi.appendChild(imgDiv);   //Kind von div
    imgDiv.classList.add("img");
    imgDiv.classList.add("align-left");
    imgDiv.setAttribute("style", "background-image: url('" + item.src + "')"); //dynamischer Inhalt

    //the text
    newLi.appendChild(document.createTextNode(item.name));   //Textknoten

    //the edit icon
    var editSpan = document.createElement("span");
    editSpan.setAttribute("class", "align-right imgbutton edit");
    newLi.appendChild(editSpan);

    ul.appendChild(newLi);  //Rest der Liste bleibt, neuse Element kommt dazu
}

/* wo immer ein Ereignis innerhalb eines li Elements auftritt*/
function getLiAncestorForElement(el) {
    if(el.tagName == "LI"){
        return el;
    } else if (el.tagName == "UL"){
        return null;
    } else if (el.parentNode){
        return getLiAncestorForElement(el.parentNode);
    } else {
        return null;
    }
}
function getTextChildrenOfElementAsText(el){
    var text = "";
    console.log("children" , el.children.length);    /*Ausgabe in Konsole Firebug*/
    for (var i=0;i<el.childNodes.length;i++){
        var currentChild = el.childNodes[i];
        if (currentChild.nodeType == Node.TEXT_NODE){
            tesxt += currentChild.nodeValue;
        }
    }
    return text;
}
