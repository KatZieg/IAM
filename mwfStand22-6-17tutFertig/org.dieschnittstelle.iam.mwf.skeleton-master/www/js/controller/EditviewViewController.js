/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class EditviewViewController extends mwf.ViewController {

        constructor() {
            super();

            console.log("EditviewViewController()");
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view

            this.mediaItem = new entities.MediaItem() ; //neues leeres mediaItem, welches als Wert eines Item-Attributes in das Element für Ractive, der Wert des Item-Attributes ist ein darin verschachteltes Item-Element
                                                        //(bidirektionales Databinding!!!!!!) submit{"_id":-1,"name":"cc","added":1514663323652,"srcType":null,"description":""} -->ractive kann eingegebene Formulardaten mit dem mediaItem-Objekt verknüpfen
            //an das neue div Element binden
            this.bindElement("mediaEditviewTemplate", {item:this.mediaItem}, this.root);
            this.root.querySelector("#mediaEditform"),onsubmit= ()=>{
               // alert("submit" +JSON.stringify(this.mediaItem));

                this.mediaItem.create(()=>{
                    this.previousView({createdItem:this.mediaItem});
                });
               return false;  //--> submit mit ohne neuladen des Browsers
            }

            // call the superclass once creation is done
            super.oncreate(callback);
        }

        /*
         * for views with listviews: bind a list item to an item view
         * TODO: delete if no listview is used or if databinding uses ractive templates
         */
        bindListItemView(viewid, itemview, item) {
            // TODO: implement how attributes of item shall be displayed in itemview
        }

        /*
         * for views with listviews: react to the selection of a listitem
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemSelected(listitem, listview) {
            // TODO: implement how selection of listitem shall be handled
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
    return EditviewViewController;
});
