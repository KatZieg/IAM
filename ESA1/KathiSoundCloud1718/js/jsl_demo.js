var listenersSet;
var listItemTemplate;
var ul;

function initialiseView(){
    toggleListeners();
    loadNewItems();
    listItemTemplate= document.getElementsByTagName("li")[0];
    listItemTemplate.parentNode.removeChild(listItemTemplate);
/*
    xhr("GET", './data/listitems.json', null, function (xhrobj) {
        var items= JSON.parse(xhrobj.responseText);
        alert("received: " + items);
        items.forEach(function(item){
            addItemToList(item);
        });
    } );*/
}

function toggleListeners() {
    var ul = document.getElementsByTagName("ul")[0];
    var tiles = document.getElementsByClassName("interactbutton thumbnails")[0];
    var refresh = document.getElementsByClassName("interactbutton refresh")[0];
    var plus = document.querySelector(".plus");

    document.getElementsByTagName("body")[0].classList.toggle("listeners-active");

    if (listenersSet) {
        plus.removeEventListener("click", loadNewItems);
        plus.setAttribute("disabled", "disabled");
        console.log("plus.disabled" + plus.disabled);
        ul.removeEventListener("click", onListItemSelected);
        tiles.removeEventListener("click", onMenueItemSelected);
        refresh.removeEventListener("click", onMenueItemSelected);
        showToast("event listeners have been removed");
        listenersSet = false;
    }
    else {
        plus.addEventListener("click",loadNewItems);
        plus.removeAttribute("disabled");
        console.log("plus.disabled" + plus.disabled);
        ul.addEventListener("click", onListItemSelected);
        tiles.addEventListener("click", onMenueItemSelected);
        refresh.addEventListener("click", onMenueItemSelected);
        showToast("event listeners have been set");
        listenersSet = true;
    }
}

function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (toast.classList.contains("active")) {
        console.info("will not show toast msg " + msg + ". Toast is currently active, and no toast buffering has been implemented so far...");
    }
    else {
        console.log("showToast(): " + msg);
        toast.textContent = msg;
        toast.removeEventListener("transitionend",finaliseToast);
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

function fadeoutToast(event) {
    var toast = event.target;
    console.log("fadeoutToast(): " + toast.textContent);
    toast.addEventListener("transitionend", finaliseToast);
    toast.removeEventListener("transitionend", fadeoutToast);
    toast.classList.remove("shown");
}

function tileListToggle() {
    var maini = document.getElementsByTagName("main")[0];
    maini.classList.toggle("faded");
    maini.addEventListener("transitionend",onTransitionend);
    function onTransitionend(event) {
        document.getElementsByTagName("body")[0].classList.toggle("tiles");
        maini.classList.toggle("faded");
        maini.removeEventListener("transitionend",onTransitionend);
    }
}

function onListItemSelected(event) {
    if (event.eventPhase == Event.BUBBLING_PHASE) {
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
        var eventTarget = lookupEventTarget(event.target);
        if (eventTarget) {
            var titel = eventTarget.getElementsByTagName('span')[2].textContent;
            var url = eventTarget.getElementsByTagName("div")[0].getAttribute("style");
            console.log("Url:   "+ url);
            if(event.target.className=="interactbutton options"){
                alert('Title: '+ titel +  '\n' + url);
            }else{
                alert('Title: '+titel);
            }
        }
    }
}
function onMenueItemSelected(event) {
    if (event.target.className == "interactbutton thumbnails") {
        tileListToggle();
    }
    if (event.target.className == "interactbutton refresh") {
        refreshContent();
    }
}
/*
function addItemToList(item){  //bekommt ein JSON übergeben
    console.log("addItemToList(): " , ul);
    console.log("addItemToList(): " +item.title);
    console.log("addItemToList() : " + item.url);

    //var liInList= document.getElementsByTagName("li")[0];

    var newLi= listItemTemplate.cloneNode(true);
    var imgDiv= newLi.querySelector(".img");
    imgDiv.setAttribute("style", "background-image: url('"+ item.src + "')");
    newLi.childNodes[1].textContent=item.title;

    ul.appendChild(newLi);
}*/