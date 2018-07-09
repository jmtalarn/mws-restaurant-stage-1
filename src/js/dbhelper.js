/*global google*/
/**
 * Common database helper functions.
 */
DBHelper = (function () {

    const port = 1337; // Change this to your server port
    const API_BASEURL = `http://localhost:${port}`;
    const API_RESTAURANTS = `${API_BASEURL}/restaurants/`;
    const API_REVIEWS = `${API_BASEURL}/reviews/`;
    const DB_RESTAURANTS = 'restaurant-reviews';
    const RESTAURANTS = 'restaurants';
    const REVIEWS = 'reviews';

    dbPromise = idb.open(DB_RESTAURANTS, 2, (upgradeDb) => {
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
        var reviews_store = upgradeDb.createObjectStore(REVIEWS, { keyPath: 'id'});
        reviews_store.createIndex('by-restaurant', 'restaurant_id', {
            unique: false
        });

    });
    dbPromise.then(db => {
        fetch(`${API_RESTAURANTS}?is_favorite=true`)
            .then(response => {
                if (!response.ok) {
                    throw Error({
                        code: response.status,
                        message: response.statusText
                    });
                }
                return response.json();
            })
            .then(favorites => {
                fetch(API_RESTAURANTS)
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
                            tx.objectStore(RESTAURANTS).put(restaurant);
                        });
                        return tx.complete;

                    }).then(t => console.log('Loaded restaurants data'));
            });


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
        getReviewsForRestaurant: (restaurant_id) => {
            fetch(`${API_REVIEWS}/?restaurant_id=${restaurant_id}`)
                .then(response => {
                    if (!response.ok) {
                        return; 
                    }
                    return response.json();
                })
                .then(json => (json? json.reduce((acc,curr)=>{ acc[curr.id]=curr; return acc; },{}):json ) )
                .then(map => {
                    //if map undefined error proceed without update
                    // if map proceed to update 
                    const reviews = [];
                    return dbPromise
                        .then(db => db.transaction(REVIEWS)
                            .objectStore(REVIEWS)
                            .index('by-restaurant')
                            .openKeyCursor(IDBKeyRange.only(restaurant_id))
                            .then(function cursorKeyIterate(cursor) {
                                if (!cursor) return;
                                const review = cursor.value;
                                if (map){
                                    if (map[review.id].updatedAt > review.updatedAt) {
                                        //update IndexedDB
                                        review.flag = '1';
                                        cursor.update(review);
                                    } else if (map[cursor.value.id].updatedAt < cursor.value.updatedAt) {
                                        //update backend with API
                                        fetch(POST REVIEW){}
                                    }
                                }
                                reviews.push(cursor.value);

                                return cursor.continue().then(cursorKeyIterate);
                            })).then(()=>{return reviews;});

                }).then(t => console.log('Loaded restaurant reviews'))
                .catch(err=>{ console.error(err); });
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
                    return Array.from(keys);
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
                        });
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
                        });
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
                        });
                });
            }
        },
        /**
         * Map marker for a restaurant.
         */
        mapMarkerForRestaurant: (restaurant, map) => {
            // https://leafletjs.com/reference-1.3.0.html#marker  
            const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
                title: restaurant.name,
                alt: restaurant.name,
                url: DBHelper.urlForRestaurant(restaurant)
            });
            marker.addTo(newMap);
            return marker;
        },
        urlForRestaurant: (restaurant) => (
            `./restaurant.html?id=${restaurant.id}`
        ),
        imageUrlForRestaurant: (restaurant) => (
            restaurant.photograph ? `/img/${restaurant.photograph}.webp` : '/img/Map_placeholder.svg'
        ),
        favRestaurant: (restaurantId, value) => (
            dbPromise
                .then(db =>
                    fetch(`${API_RESTAURANTS}${restaurantId}/?is_favorite=${value}`, {
                        method: 'PUT'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw Error({
                                    code: response.status,
                                    message: response.statusText
                                });
                            }
                            return response.json();
                        }).then(restaurant => {
                            const tx = db.transaction(RESTAURANTS, 'readwrite');
                            tx.objectStore(RESTAURANTS).put(restaurant);
                            return tx.complete;
                        })
                )
        ),

    };

})();
