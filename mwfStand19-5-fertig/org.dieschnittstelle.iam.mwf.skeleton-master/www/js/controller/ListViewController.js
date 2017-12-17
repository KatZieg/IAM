/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class ListViewController extends mwf.ViewController {

        constructor() {
            super();

            console.log("ListViewController()");
            //aus entities importieren
            //test1 etc sind nicht die aus MediaItem, die sichtbaren sind das template..
            this.items=[new entities.MediaItem("m1", "./content/img/test1.jpeg"), new entities.MediaItem("m2", "./content/img/test2.png"), new entities.MediaItem("m3", "./content/img/insel_von_oben.jpeg")];

        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view
            //Listview like this
            this.initialiseListview(this.items);

            // call the superclass once creation is done
            super.oncreate(callback);
        }

        /*
         * for views with listviews: bind a list item to an item view
         * TODO: delete if no listview is used or if databinding uses ractive templates
         * Template wird durch framework geklont, hier wird angegeben, welche Elemente es betrifft
         */
        bindListItemView(viewid, itemview, item) {
            // TODO: implement how attributes of item shall be displayed in itemview
            //hier wird eine Instanz von itemview übergeben, eingepackt in ein Objekt, welches die Objektattribute darstellen soll
            console.log("->>>>>bind listItemView" + item.name + "->>>>>itemview: " + itemview);
            itemview.root.getElementsByTagName("img")[0].src=item.src;
            itemview.root.getElementsByTagName("h2")[0].textContent=item.name;
            itemview.root.getElementsByTagName("h3")[0].textContent=item.added;
        }

        /*
         * for views with listviews: react to the selection of a listitem -> ONCLICK
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemSelected(listitem, listview) {
            // TODO: implement how selection of listitem shall be handled
            console.log("------------------------->onListItemSelected: " + listitem);
            alert("selected: " + listitem.name);
            ///////////////////////////////////////////////////////////////////////////////////////////23-5-min24!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!listitem hinzufügen
        }

        /*
         * for views with listviews: react to the selection of a listitem menu option
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
        onListItemMenuItemSelected(option, listitem, listview) {
            // TODO: implement how selection of option for listitem shall be handled
        }

        /*


         * for views with dialogs
         * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
         */
        bindDialog(dialogid, dialog, item) {
            // call the supertype function
            super.bindDialog(dialogid, dialog, item);


            // TODO: implement action bindings for dialog, accessing dialog.root
        }


    }

    // and return the view controller function
    return ListViewController;
});
