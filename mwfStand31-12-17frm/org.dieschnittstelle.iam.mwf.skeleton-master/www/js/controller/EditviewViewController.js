/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class EditviewViewController extends mwf.ViewController {

        constructor() {
            super();

            console.log("ListviewViewController()");
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view

            //schauen ob es das item schon gibt wenn nicht bearbeiten
            if(this.args && this.args.item){
                this.mediaItem = this.args.item;

            }else{
                this.mediaItem = new entities.MediaItem();
            }


            //bidirektionales Databinding, eingegebene Daten anzeigen, interne Daten anzeigen ->ractive!!
            this.bindElement("mediaEditviewTemplate", {item:this.mediaItem}, this.root); //root=div an welches drangehängt werden soll

            this.editForm = this.root.querySelector("#mediaEditform");
            this.editForm.onsubmit=()=>{
                //alert("submit" + JSON.stringify(this.mediaItem));
                if(this.mediaItem.srcType == 'upload'){

                    var filedata = this.editForm.srcfile.files[0];
                    //alert("upload!" + filedata);

                    var formdata = new FormData();
                    formdata.append("srcfile", filedata);
                    var xhr = new XMLHttpRequest();  //aus JS Daten an Server übermitteln
                    xhr.open("POST", "api/upload");
                    xhr.send(formdata);   //Bild senden von Client an Server
                    xhr.onreadystatechange = ()=>{  //Response verarbeiten
                        if(xhr.readyState == 4){  //JSON Objekt auslesen
                            if (xhr.status ==200){
                                //alert("xhr response text " + xhr.responseText);
                                var responsedata = JSON.parse(xhr.responseText);
                                var uploadedDataUrl = responsedata.data.srcfile;
                                //alert("srcfile"+ uploadedDataUrl);
                                this.mediaItem.src = uploadedDataUrl;
                                this.createOrUpdateMediaItem();
                            }
                            else{
                                alert("Error");
                            }

                        }
                    }
                }
                else{
                    this.createOrUpdateMediaItem();
                }

                // this.mediaItem.create(()=>{
                //     this.previousView({createdItem:this.mediaItem}); //neue Item wird der Listenansicht hinzugefügt
                // });
                return false;
                }
                //Vorschaubild in Editieransicht
                //URL Vorschau
                var preview= this.root.querySelector("main img");

                this.editForm.src.onblur=()=>{
                    preview.src= this.mediaItem.src;
                }

                //Upload Vorschau
                this.editForm.srcfile.onchange=()=>{
                    var imgfile=this.editForm.srcfile.files[0];

                    //object url
                    // var objectUrl= URL.createObjectURL(imgfile);
                    // //alert("file selected" + imgfile + "url " + objectUrl);
                    // preview.src=objectUrl;

                    //data url: 64bit String binär Problem: riesig -> Browser wird langsamer, so groß wie Daten selbst
                    var reader = new FileReader();
                    reader.readAsDataURL(imgfile);
                    reader.onload=()=>{
                        var dataurl = reader.result;
                        console.log("dataurl" + dataurl);
                        preview.src = dataurl;
                    }
                }
            // call the superclass once creation is done
            super.oncreate(callback);
        }

        createOrUpdateMediaItem(){
            //falls mediaItem noch nicht created ist ein Update durchführen
            //@created: prüft auf positive oder negative id
            alert("createOrUploadMediaItem" + JSON.stringify(this.mediaItem));
            if(this.mediaItem.created){
                this.mediaItem.update(()=>{
                    this.previousView({updatedItem:this.mediaItem});
                });
            }
            else{
                this.mediaItem.create(()=>{   //ansonsten erstellen und hinzufügen
                    this.previousView({createdItem:this.mediaItem});
                });
            }
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
