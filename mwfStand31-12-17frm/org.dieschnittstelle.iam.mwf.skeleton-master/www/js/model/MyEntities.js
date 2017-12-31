/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */

/*
 * a global counter for ids
 */
define(["mwfUtils", "EntityManager"], function (mwfUtils, EntityManager) {


    /*************
     * example entity
     *************/

    class MyEntity extends EntityManager.Entity {

        constructor() {
            super();
        }
    }

    // TODO-REPEATED: add new entity type declarations here
    //EntityManager = Modul mit bereitgestellten Funktionen, definiert in Main.js
    class MediaItem extends EntityManager.Entity{
        constructor(name, src, contentType){
            super();
            this.name= name;
            this.src= src;
            this.contentType= contentType;
            this.added = Date.now();
            this.srcType= null;
            this.description= "";
        }
        get addedDateString(){
            return (new Date(this.added)).toLocaleDateString();
        }

        get mediaType(){
            if (this.contentType){
                var index=this.contentType.indexOf("/");
                if(index > -1){
                    return this.contentType.substring(0, index);
                }else{
                    return "UNKNOWN";
                }
            } else {
                return "UNKNOWN";
            }
        }
    }


    // TODO-REPEATED: do not forget to export all type declarations
    //Zugriff von Ausserhalb auf MediaItem möglich machen:
    return {
        MyEntity: MyEntity,
        MediaItem:MediaItem
    };

});
