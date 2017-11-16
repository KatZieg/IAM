

function loadNewItems() {

    // we initiate an xmlhttprequest and read out its body
    xhr("GET","data/listitems.json",null,function(xhr) {
        var textContent = xhr.responseText;
        console.log("loaded textContent from server: " + textContent);
        var jsonContent = JSON.parse(textContent);


        // we assume jsonContent is an array and iterate over its members
        jsonContent.forEach(function(contentItem){
            createListElementForContentItem(contentItem);
        });
    });
}

function createListElementForContentItem(item) {

    var li = document.createElement("li");
    //li.textContent = item.title;
    //li.classList.add("mediaTitle");

    //Liste mit Bild
    var div = document.createElement("div");
    li.appendChild(div);
    div.classList.add("img");
    div.setAttribute("style", "background-image: url('"+item.src +"')");
    console.log(div);


    //Kasten mit Elementen
    var listBox = document.createElement("div");
    li.appendChild(listBox);
    listBox.classList.add("listBox");

    //Kasten mit Bildquelle und Datum
    var imageDates = document.createElement("div");
    listBox.appendChild(imageDates);
    imageDates.classList.add("imageDates");

    //Bildquelle
    var lorem = document.createElement("span");
    lorem.textContent = item.owner;
    imageDates.appendChild(lorem);
    lorem.classList.add("align-left");

    //Datum
    var date= document.createElement("span");
    date.textContent = item.added;
    imageDates.appendChild(date);
    date.classList.add("align-right");

    //Kasten für Titel
    var mediaTitle= document.createElement("div");
    listBox.appendChild(mediaTitle);
    mediaTitle.classList.add("mediaTitle");

    //Titel
    var title= document.createElement("span");
    mediaTitle.appendChild(title);
    title.textContent= item.title;

    //Kasten für Interactbuttons
    var buttonsBox= document.createElement("div");
    listBox.appendChild(buttonsBox);
    buttonsBox.classList.add("buttonsBox");

    //Play
    var play=document.createElement("span");
    buttonsBox.appendChild(play);
    play.classList.add("interactbutton");
    play.classList.add("play");

    //Tags
    var tag= document.createElement("span");
    buttonsBox.appendChild(tag);
    tag.classList.add("tag");
    tag.textContent= item.numOfTags;

    //Options
    var options= document.createElement("span");
    buttonsBox.appendChild(options);
    options.classList.add("interactbutton");
    options.classList.add("options");

    // add the element to the list
    document.getElementsByTagName("ul")[0].appendChild(li);
}

function refreshContent() {
   //var table=$('#example').DataTable({
     //  ajax:"listitems.json"
    location.reload();
    //});
}