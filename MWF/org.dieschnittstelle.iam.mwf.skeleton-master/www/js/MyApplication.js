/**
 * Created by master on 17.02.16.
 */
define(["mwf", "mwfUtils", "EntityManager", "entities", "GenericCRUDImplLocal", "GenericCRUDImplRemote"], function (mwf, mwfUtils, EntityManager, entities, GenericCRUDImplLocal, GenericCRUDImplRemote) {

    class MyApplication extends mwf.Application {

        constructor() {
            super();
        }

        oncreate(callback) {
            console.log("MyApplication.oncreate(): calling supertype oncreate");

            // first call the supertype method and pass a callback
            super.oncreate(() => {

                // Object Store, initialise the local database, eine Collection für MediaItem wird erstellt!!!!!!!
                // TODO-REPEATED: add new entity types to the array of object store names
                GenericCRUDImplLocal.initialiseDB("mwftutdb", 1, ["MyEntity", "MediaItem"], (() => {

                    //// TODO-REPEATED: if entity manager is used, register entities and crud operations for the entity types
                   // this.registerEntity("MyEntity", entities.MyEntity, true);
                    //this.registerCRUD("MyEntity", this.CRUDOPS.LOCAL, GenericCRUDImplLocal.newInstance("MyEntity"));
                    //this.registerCRUD("MyEntity", this.CRUDOPS.REMOTE, GenericCRUDImplRemote.newInstance("MyEntity"));

                    // TODO: do any further application specific initialisations here
                    //lokaler und remote Datenzugriff
                    this.registerEntity("MediaItem", entities.MediaItem, true);
                    this.registerCRUD("MediaItem", this.CRUDOPS.LOCAL, GenericCRUDImplLocal.newInstance("MediaItem"));
                    this.registerCRUD("MediaItem", this.CRUDOPS.REMOTE, GenericCRUDImplRemote.newInstance("MediaItem"));

                    this.initialiseCRUD(this.CRUDOPS.LOCAL, EntityManager);

                    // THIS MUST NOT BE FORGOTTEN: initialise the entity manager!
                    EntityManager.initialise();

                    // do not forget to call the callback
                    callback();
                }));

            });

        };

    }

    return new MyApplication();

});