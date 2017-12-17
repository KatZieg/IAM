var listenersSet;

function initialiseView(){
    toggleListeners();
    loadNewItems();
}

function toggleListeners() {
    var ul = document.getElementsByTagName("ul")[0];
    var tiles = document.getElementsByClassName("interactbutton thumbnails")[0];
    var refresh = document.getElementsByClassName("interactbutton refresh")[0];

    document.getElementsByTagName("body")[0].classList.toggle("listeners-active");

    if (listenersSet) {
        ul.removeEventListener("click", onListItemSelected);
        tiles.removeEventListener("click", onMenueItemSelected);
        refresh.removeEventListener("click", onMenueItemSelected);
        showToast("event listeners have been removed");
        listenersSet = false;
    }
    else {
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
            var titelName = eventTarget.getElementsByTagName('span')[2].textContent;
            var url = eventTarget.getElementsByTagName("div")[0].getAttribute("style");
            console.log("Url:   "+ url);
            if(event.target.className=="interactbutton options"){
                alert('TITEL: '+ titelName +  '\n' + url);
            }else{
                alert('TITEL: '+titelName);
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
