/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class ListviewViewController extends mwf.ViewController {

        constructor() {
            super();

            //aus entities importieren
            //test1 etc sind nicht die aus MediaItem, es sind dummy-Daten, die sichtbaren sind das template..
            //this.items=[new entities.MediaItem("m1", "http://lorempixel.com/100/100"), new entities.MediaItem("m2", "http://lorempixel.com/200/150"), new entities.MediaItem("m3", "http://lorempixel.com/150/200")];
            //this.addNewMediaItem = null;

            //resetDatabase Icon
            this.resetDatabaseElement= null;

            //this.crudops= GenericCRUDImplLocal.newInstance("MediaItem");
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view

            this.addListener(new mwf.EventMatcher("crud", "created", "MediaItem"), ((event) => {
                this.addToListview(event.data);
            }));
            this.addListener(new mwf.EventMatcher("crud", "updated", "MediaItem"), ((event) => {
                this.updateInListview(event.data._id, event.data);
            }));
            this.addListener(new
            mwf.EventMatcher("crud", "deleted", "MediaItem"), ((event) => {
                this.removeFromListview(event.data);
            })
            );
            //this.initialiseListview(this.items);

            //set Listener to plus icon via id
            this.addNewMediaItemElement = this.root.querySelector("#addNewMediaItem");
            //neues MediaItem-Objekt erzeugen und zur Listenansicht hinzufügen
            //=> lambda-Notation: anonyme Funktion, die nur über Referenzen und Zeiger angesprochen werden kann, entspricht .bind(this)
            this.addNewMediaItemElement.onclick = (() => {
                //this.crudops.create(new entities.MediaItem("m"+ Date.now(), "http://lorempixel.com/50/50"), ((created) => {
                //this.addToListview(created);
                //}));
                this.createNewItem();
            });

            //Befüllen der Listenansicht mit dem Resultat von readAll()
            //alle CRUD Ops auf indexedDB werden asynchron ausgeführt und erfordern callback für das Ergebnis
            //this.crudops.readAll((items)=> {
            //this.initialiseListview(items);
            // });
            entities.MediaItem.readAll((items) => {
                this.initialiseListview(items);
            });

            //resetDatabase Icon add Listener
            this.resetDatabaseElement = this.root.querySelector("#resetDatabase");
            this.resetDatabaseElement.onclick = (() => {
                if (confirm("Soll die Datenbank wirklich zurückgesetzt werden? ")) {
                    indexedDB.deleteDatabase("mwftutdb");
                }
            });

            //local oder remote Zugriff
            //jeder ViewController hat auch ein Applikation-Attribut (=Instanz der MyApplication.js)
            this.root.querySelector("footer .mwf-img-refresh").onclick = () => {
                alert("switch CRUD " + this.application.currentCRUDScope);
                if (this.application.currentCRUDScope == "local"){
                    this.application.switchCRUD("remote");
                }
                else{
                    this.application.switchCRUD("local");
                }
                entities.MediaItem.readAll((items)=>{
                    this.initialiseListview(items);
                });
            };

            // call the superclass once creation is done
            super.oncreate(callback);
        }

        createNewItem()
        {
            var newItem = new entities.MediaItem("item", "http://placeimg.com/640/480/nature");
            console.log("-------------------------------------------id ist: " + newItem._id);
            this.showDialog("mediaItemDialog", {
                item: newItem,
                actionBindings: {
                    submitForm: ((event) => {
                        event.original.preventDefault();
                        newItem.create(() => {   //create () auf mediaItem aufrufen!!
                        //this.addToListview(newItem); Seite 70
                            console.log("-----nach create()--------------------------------------id ist: " + newItem._id);
                        });
                        this.hideDialog();
                    })
                }
            });
            console.log("------------ende-------------------------------id ist: " + newItem._id);
        }

        deleteItem(item) {
            //this.crudops.delete(item._id, ()=> {
            //  this.removeFromListview(item._id);
            //});
            item.delete(() => {
                //this.removeFromListview(item._id);
            //this.hideDialog();
            });
        }

        exitItem(){
            this.hideDialog();
        }

        confirmItem(item){
            item.name= item.name + " ";
            this.showDialog("deleteItemDialog", {
                item: item,
                actionBindings: {
                    exitItem: ((event)=>{
                        this.exitItem(item);
                        this.hideDialog();
                    }),
                    deleteItem: ((event)=> {
                        this.deleteItem(item);
                        this.hideDialog();
                    })
                }
            });
        }


        editItem(item) {
            item.name= "name: " + item.name;
           // item.name= "name: " +item.name + item.name; redundant
            //this.crudops.update(item._id, item, (()=> {
            //   this.updateInListview(item._id, item);
            // }));
            item.update(() => {
                this.updateInListview(item._id, item);
            });
            this.showDialog("mediaItemDialog", {
                item: item,
                actionBindings: {
                    submitForm: ((event) => {
                        event.original.preventDefault();
                        item.update(() => {
                            //this.updateInListview(item._id, item);
                        });
                        this.hideDialog();
                    }),
                    deleteItem: ((event)=> {
                        this.deleteItem(item);
                        this.hideDialog();
                    })
                }
            });

        }


        onReturnFromSubview(subviewid, returnValue, returnStatus, callback){
            if (subviewid == "mediaReadview" && returnValue && returnValue.deletedItem){
                this.removeFromListview(returnValue.deletedItem._id);
            }
            callback();
        }

        /*
         * for views with listviews: bind a list item to an item view
         * TODO: delete if no listview is used or if databinding uses ractive templates
         * Template wird durch framework geklont, hier wird angegeben, welche Elemente es betrifft
         */
        /*bindListItemView(viewid, itemview, item) {
         // TODO: implement how attributes of item shall be displayed in itemview
         //hier wird eine Instanz von itemview übergeben, eingepackt in ein Objekt, welches die Objektattribute darstellen soll
         console.log("->>>>>bind listItemView" + item.name + "->>>>>itemview: " + itemview);
         itemview.root.getElementsByTagName("img")[0].src=item.src;
         itemview.root.getElementsByTagName("h2")[0].textContent=item.name + item._id;
         itemview.root.getElementsByTagName("h3")[0].textContent=item.added;
         }*/

        /*
         * for views with listviews: react to the selection of a listitem -> ONCLICK
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        /*onListItemSelected(listitem, listview) {
            // TODO: implement how selection of listitem shall be handled
            console.log("------------------------->onListItemSelected: " + listitem);
            //alert("selected: " + listitem.name + listitem._id);
            this.nextView("mediaReadview", {item:listitem});
        } kann raus weil targetview gestzt ist*/

        /*
         * for views with listviews: react to the selection of a listitem menu option
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemMenuItemSelected(option, listitem, listview) {
            // TODO: implement how selection of option for listitem shall be handled
            console.log("----------------------------------------------------------------onListItemMenuItemSelected: " + option + "NAME: " + listitem.name);
            super.onListItemMenuItemSelected(option, listitem, listview);
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
    return ListviewViewController;
});
