/*global google*/
/**
 * Common database helper functions.
 */
DBHelper = (function () {

    const port = 1337; // Change this to your server port
    const DATABASE_URL = `http://localhost:${port}/restaurants/`;
    const DB_NAME = `restaurant-reviews`;
    const RESTAURANTS = `restaurants`;

    dbPromise = idb.open(DB_NAME, 1, (upgradeDb) => {
        var store = upgradeDb.createObjectStore(RESTAURANTS, {
            keyPath: 'id'
        });
        store.createIndex('by-cuisine', 'cuisine_type', {
            unique: false
        });
        store.createIndex('by-neighborhood', 'neighborhood', {
            unique: false
        });
        store.createIndex('by-neighborhood-cuisine', ['neighborhood', 'cuisine_type'], {
            unique: false
        });


    });
    dbPromise.then(db => {

        fetch(DATABASE_URL)
            .then(response => {
                if (!response.ok) {
                    throw Error({
                        code: response.status,
                        message: response.statusText
                    });
                }
                return response.json();
            })
            .then(json => {
                const tx = db.transaction(RESTAURANTS, 'readwrite');
                json.forEach(restaurant => {
                    tx.objectStore(RESTAURANTS).put(restaurant)
                });
                return tx.complete;

            }).then(t => console.log("Loaded restaurants data"))

    });
    return {
        getAllRestaurants: () => {
            return dbPromise.then(db => {
                return db.transaction(RESTAURANTS)
                    .objectStore(RESTAURANTS).getAll();
            });
        },
        getRestaurantById: (id) => {
            return dbPromise.then(db => {
                return db.transaction(RESTAURANTS)
                    .objectStore(RESTAURANTS).get(id);
            });
        },
        getCuisines: () => {
            let keys = new Set();
            return dbPromise
                .then(db => db.transaction(RESTAURANTS)
                    .objectStore(RESTAURANTS)
                    .index('by-cuisine')
                    .openKeyCursor()
                    .then(function cursorKeyIterate(cursor) {
                        if (!cursor) return;
                        keys.add(cursor.key);
                        return cursor.continue().then(cursorKeyIterate);
                    })).then(() => {
                    return Array.from(keys);
                });
        },

        getNeighborhoods: () => {
            let keys = new Set();
            return dbPromise
                .then(db => db.transaction(RESTAURANTS)
                    .objectStore(RESTAURANTS)
                    .index('by-neighborhood')
                    .openKeyCursor()
                    .then(function cursorKeyIterate(cursor) {
                        if (!cursor) return;
                        keys.add(cursor.key);
                        return cursor.continue().then(cursorKeyIterate);
                    })).then(() => {
                    return Array.from(keys)
                });

        },
        getRestaurantsByCuisine: (cuisine) => {
            var restaurants = [];
            return dbPromise
                .then(db => {
                    return db.transaction(RESTAURANTS)
                        .objectStore(RESTAURANTS)
                        .index('by-cuisine').openCursor(IDBKeyRange.only(cuisine)).then(function cursorIterate(cursor) {
                            if (!cursor) return;
                            restaurants.push(cursor.value);
                            return cursor.continue().then(cursorIterate);
                        }).then(() => {
                            return restaurants;
                        })
                });
        },
        getRestaurantsByNeighborhood: (neighborhood) => {
            var restaurants = [];
            return dbPromise
                .then(db => {
                    return db.transaction(RESTAURANTS)
                        .objectStore(RESTAURANTS)
                        .index('by-neighborhood')
                        .openCursor(IDBKeyRange.only(neighborhood))
                        .then(function cursorIterate(cursor) {
                            if (!cursor) return;
                            restaurants.push(cursor.value);
                            return cursor.continue().then(cursorIterate);
                        }).then(() => {
                            return restaurants;
                        })
                });
        },

        getRestaurantsByCuisineAndNeighborhood: (cuisine, neighborhood) => {
            if (cuisine === 'all' && neighborhood === 'all') {
                return this.DBHelper.getAllRestaurants();
            } else if (cuisine === 'all' && neighborhood !== 'all') {
                return this.DBHelper.getRestaurantsByNeighborhood(neighborhood);
            } else if (cuisine !== 'all' && neighborhood === 'all') {
                return this.DBHelper.getRestaurantsByCuisine(cuisine);
            } else {
                return dbPromise.then(db => {
                    var restaurants = [];
                    return db.transaction(RESTAURANTS)
                        .objectStore(RESTAURANTS)
                        .index('by-neighborhood-cuisine')
                        .openCursor(IDBKeyRange.only([neighborhood, cuisine]))
                        .then(function cursorIterate(cursor) {
                            if (!cursor) return;
                            restaurants.push(cursor.value);
                            return cursor.continue().then(cursorIterate);
                        }).then(() => {
                            return restaurants;
                        })
                })
            }
        },
        /**
         * Map marker for a restaurant.
         */
        mapMarkerForRestaurant: (restaurant, map) => {
            const marker = new google.maps.Marker({
                position: restaurant.latlng,
                title: restaurant.name,
                url: DBHelper.urlForRestaurant(restaurant),
                map: map,
                animation: google.maps.Animation.DROP
            });
            return marker;
        },
        urlForRestaurant: (restaurant) => (
            `./restaurant.html?id=${restaurant.id}`
        ),
        imageUrlForRestaurant: (restaurant) => (
            restaurant.photograph ? `/img/${restaurant.photograph}.webp` : '/img/Map_placeholder.svg'
        )


    }

})();