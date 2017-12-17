var listenersSet;
//

//
function toggleListeners2() {
    // we set an onclick listener on the list view and check from which item the event was generated
    // we also set a listener on the '+'-button that loads content from the server!
    var ul = document.getElementsByTagName("ul")[0];
    var tiles = document.getElementsByClassName("button btn-tiles")[0];
    var refresh = document.getElementsByClassName("button btn-refresh")[0];
    //var newItem = document.querySelector(".new-item");

    document.getElementsByTagName("body")[0].classList.toggle("listeners-active");

    if (listenersSet) {
        //newItem.removeEventListener("click",loadNewItems);
        //newItem.setAttribute("disabled","disabled");
        //console.log("newItem.disabled: " + newItem.disabled);
        ul.removeEventListener("click", onListItemSelected);
        tiles.removeEventListener("click", onMenueItemSelected);
        refresh.removeEventListener("click", onMenueItemSelected);
        showToast("event listeners have been removed");
        listenersSet = false;
    }
    else {
        //newItem.addEventListener("click",loadNewItems);
        //newItem.removeAttribute("disabled");
        //console.log("newItem.disabled: " + newItem.disabled);
        ul.addEventListener("click", onListItemSelected);
        tiles.addEventListener("click", onMenueItemSelected);
        refresh.addEventListener("click", onMenueItemSelected);
        showToast("event listeners have been set");
        listenersSet = true;
    }
}

/* show a toast and use a listener for transitionend for fading out */
function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (toast.classList.contains("active")) {
        console.info("will not show toast msg " + msg + ". Toast is currently active, and no toast buffering has been implemented so far...");
    }
    else {
        console.log("showToast(): " + msg);
        toast.textContent = msg;
        /* cleanup */
        toast.removeEventListener("transitionend",finaliseToast);
        /* initiate fading out the toast when the transition has finished nach Abschluss der Transition */
        toast.addEventListener("transitionend", fadeoutToast);
        toast.classList.add("shown");
        toast.classList.add("active");
    }
}

function finaliseToast(event) {
    var toast = event.target;
    console.log("finaliseToast(): " + toast.textContent);
    toast.classList.remove("active");
}

/* trigger fading out the toast and remove the event listener  */
function fadeoutToast(event) {
    var toast = event.target;
    console.log("fadeoutToast(): " + toast.textContent);
    /* remove tranistionend listener */
    toast.addEventListener("transitionend", finaliseToast);
    toast.removeEventListener("transitionend", fadeoutToast);
    toast.classList.remove("shown");
}

// Umschalten zwischen Listen- und Kachelansicht
function tileListToggle() {
    //alert('tileListToggle started')
    //Zugriff auf header und main Elemente
    //var headi = document.getElementsByTagName("header")[0];
    var maini = document.getElementsByTagName("main")[0];

    //header und main Elemente ausblenden
    //headi.classList.toggle("ausblenden");
    maini.classList.toggle("ausblenden");

    //nach dem ausblenden wird die Funktion onTransitionend aufgerufen
    maini.addEventListener("transitionend",onTransitionend);

    /*kompletter body Bereich auf die Kachelansicht wird geändert. Danach wird die Kachelansicht eingeblendet und das
     Ein-/Ausblenden terminiert.*/
    function onTransitionend(event) {
        //alert('TEST');
        document.getElementsByTagName("body")[0].classList.toggle("kachel");
        maini.classList.toggle("ausblenden");
        //headi.classList.toggle("ausblenden");
        maini.removeEventListener("transitionend",onTransitionend);

    }

}
////////////////////////////////////

// a function that reacts to the selection of a list item
function onListItemSelected(event) {
    //alert('started....');

    // check in which phase we are
    if (event.eventPhase == Event.BUBBLING_PHASE) {
        //var eventTarget = lookupEventTarget(event.target);
        //alert('BUBBLING_PHASE....');
        // a helper function that looks up the target li element of the event
        function lookupEventTarget(el) {
            //alert('lookupEventTarget....');
            if (el.tagName.toLowerCase() == "li") {
                //alert('li....');
                /*alert('TITEL: '+el.getElementsByTagName('span')[2].textContent); //geht!
                 alert('PICTURE PATH'+el.getElementsByTagName("img")[0].getAttribute("src")); //geht!*/
                return el;
            }
            else if (el.tagName.toLowerCase() == "ul") {
                console.warn("lookupEventTarget(): we have already reached the list root!");
                return null;
            }
            else if (el.parentNode) {
                return lookupEventTarget(el.parentNode);
            }
        }
        //
        // lookup the target of the event
        var eventTarget = lookupEventTarget(event.target);
        if (eventTarget) {
            var titelName = eventTarget.getElementsByTagName('span')[2].textContent;
            var picPath = eventTarget.getElementsByTagName("img")[0].getAttribute("src");
            //alert(event.target.className);
            if(event.target.className=="button btn-more"){
                alert('TITEL: '+titelName+' ||| BildPfad: '+picPath);
            }else{
                alert('TITEL: '+titelName);
            }
        }
    }
}

// a function that reacts to the selection of a Menue item
function onMenueItemSelected(event) {
    //alert('started....');
    if (event.target.className == "button btn-tiles") {
        tileListToggle();
    }
    if (event.target.className == "button btn-refresh") {
        refreshContent();
    }
}

///////////////////////////////////


//alert beim onclick auf die Listen und option Elemente
/*function urltitel(number) {
 var x = number;



 var listenElement = document.getElementsByClassName("mainarea")[0];
 listenElement.onclick = function (event) {

 //alert('event.target.tagName'+event.target.tagName);

 if (event.target.className == "button btn-more") {
 alert('gefunden button btn-more');
 var eventTarget2 = onListItemSelected(event);
 if (eventTarget2) {
 alert('gefunden #2');
 var titleStrg = eventTarget2;
 alert('Titel: '+titleStrg);
 }

 //optionenrem(event);
 //var att = document.getElementsByTagName("img")[x].getAttribute("src");
 //alert(document.getElementsByTagName("h3")[x].innerHTML + " " +  att);
 }
 else if  (event.target.tagName = "LI") {
 //alert(document.getElementsByTagName("h3")[x].innerHTML);
 // check in which phase we are
 if (event.eventPhase == Event.BUBBLING_PHASE) {
 // a helper function that looks up the target li element of the event
 function lookupEventTarget(el) {
 if (el.tagName.toLowerCase() == "li") {
 return el;
 }
 else if (el.tagName.toLowerCase() == "ul") {
 console.warn("lookupEventTarget(): we have already reached the list root!");
 return null;
 }
 else if (el.parentNode) {
 return lookupEventTarget(el.parentNode);
 }
 }

 // lookup the target of the event
 var eventTarget = lookupEventTarget(event.target);
 if (eventTarget) {
 // from the eventTarget, we find out the title of the list item, which is simply the text content of the li element
 //alert("selected: " + eventTarget.textContent);
 //alert("selected: " + mainDiv.getElementsByTagName('div')[1].textContent);
 //eventTarget.parentNode.removeChild(eventTarget);
 //alert(eventTarget.getElementsByTagName("span")[2].innerHTML);

 var mainDiv = eventTarget,
 //childDiv = mainDiv.getElementsByTagName('div')[0],
 requiredDiv = mainDiv.getElementsByTagName('span')[2];
 //requiredDiv = childDiv.getElementsByTagName('h3')[0];


 alert('Titel:: '+requiredDiv.textContent);
 }
 else {
 alert("list item target of event could not be determined!");
 }
 }
 }

 }


 }*/

function init(){
    toggleListeners2();
    loadNewItems();
}