class DBHelper1{constructor(){fetch(DBHelper1.DATABASE_URL).then(e=>{if(!e.ok)throw Error({code:e.status,message:e.statusText});return e.json()}).then(e=>{this.dbPromise=idb.open(DBHelper1.DB_NAME,1,e=>{var t=e.createObjectStore(DBHelper1.RESTAURANTS,{keyPath:"id"});console.log("****************************"),console.log(t),t.createIndex("by-cuisine","cuisine_type",{unique:!1}),t.createIndex("by-neighborhood","neighborhood",{unique:!1}),console.log("ALL CREATED",t)}),this.dbPromise.then(t=>{const r=t.transaction(DBHelper1.RESTAURANTS,"readwrite");return e.forEach(e=>r.objectStore(DBHelper1.RESTAURANTS).put(e)),r.complete})})}static get DATABASE_URL(){return"http://localhost:1337/restaurants/"}static get DB_NAME(){return"restaurant-reviews"}static get RESTAURANTS(){return"restaurants"}getAllRestaurants(){return this.dbPromise.then(e=>e.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).getAll())}getRestaurantById(e){return this.dbPromise.then(t=>t.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).get(e))}getCuisines(){return this.dbPromise.then(e=>e.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).index("by-cuisine").getAllKeys().then(e=>Array.from(new Set(e))))}getNeighborhoods(){return this.dbPromise.then(e=>e.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).index("by-neighborhood").getAllKeys().then(e=>Array.from(new Set(e))))}getRestaurantsByCuisine(e){return this.dbPromise.then(t=>{var r=[];return t.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).index("by-cuisine").openCursor(IDBKeyRange.only(e)).then(function e(t){if(t)return console.log(t.value),r.push(t.value),t.continue().then(e)}),r})}getRestaurantsByNeighborhood(e){return this.dbPromise.then(e=>{var t=[];return e.transaction(DBHelper1.RESTAURANTS).objectStore(DBHelper1.RESTAURANTS).index("by-neighborhood").openCursor(IDBKeyRange.only(cuisine)).then(function e(r){if(r)return console.log(r.value),t.push(r.value),r.continue().then(e)}),t})}getRestaurantsByCuisineAndNeighborhood(e,t){return this.getAllRestaurants().then(r=>r.filter(r=>r.cuisine_type===e&&r.neighborhood===t))}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return e.photograph?`/img/${e.photograph}.webp`:"/img/Map_placeholder.svg"}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}}
//# sourceMappingURL=../maps/js/dbhelper.1.js.map
