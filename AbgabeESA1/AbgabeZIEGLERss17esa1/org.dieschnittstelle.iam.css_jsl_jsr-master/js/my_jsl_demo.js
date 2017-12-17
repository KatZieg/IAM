/**
 * Created by Haselitos on 13.05.2017.
 */

//soll auf Kachelansicht umschalten, nochmaliger soll den class-Wert entfernen um zur Liste zurück zukommen

var ul;  //global

function initialiseView(){
    //alert ("initiliseView()!")
    var header = document.getElementsByClassName("thumbnails")[0];   /*auslesen*/
    var main = document.querySelector("main");   /*auslesen*/
    var body= document.getElementsByTagName("body")[0];

    body.classList.remove("tiles");
    main.classList.remove("faded");

    header.onclick = function () {
        if (main.classList.contains("tiles")) {
            main.classList.remove("tiles");
        } else {
            main.classList.add("tiles");
        }
    }

    ul = document.getElementsByTagName("ul")[0];
    ul.onclick = function(event) {
        var liElement = getLiAncestorForElement(event.target);
        if (liElement) {
            alert("click on : " + getTextChildrenOfElementAsText(liElement));
        } else {
            alert("click: no li found! ");
        }
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
