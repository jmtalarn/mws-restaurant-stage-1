DBHelper=function(){const e="restaurants";return dbPromise=idb.open("restaurant-reviews",1,t=>{var n=t.createObjectStore(e,{keyPath:"id"});n.createIndex("by-cuisine","cuisine_type",{unique:!1}),n.createIndex("by-neighborhood","neighborhood",{unique:!1}),n.createIndex("by-neighborhood-cuisine",["neighborhood","cuisine_type"],{unique:!1})}),dbPromise.then(t=>{fetch("http://localhost:1337/restaurants/").then(e=>{if(!e.ok)throw Error({code:e.status,message:e.statusText});return e.json()}).then(n=>{const r=t.transaction(e,"readwrite");return n.forEach(t=>{r.objectStore(e).put(t)}),r.complete}).then(e=>console.log("Loaded restaurants data"))}),{getAllRestaurants:()=>dbPromise.then(t=>t.transaction(e).objectStore(e).getAll()),getRestaurantById:t=>dbPromise.then(n=>n.transaction(e).objectStore(e).get(t)),getCuisines:()=>{let t=new Set;return dbPromise.then(n=>n.transaction(e).objectStore(e).index("by-cuisine").openKeyCursor().then(function e(n){if(n)return t.add(n.key),n.continue().then(e)})).then(()=>Array.from(t))},getNeighborhoods:()=>{let t=new Set;return dbPromise.then(n=>n.transaction(e).objectStore(e).index("by-neighborhood").openKeyCursor().then(function e(n){if(n)return t.add(n.key),n.continue().then(e)})).then(()=>Array.from(t))},getRestaurantsByCuisine:t=>{var n=[];return dbPromise.then(r=>r.transaction(e).objectStore(e).index("by-cuisine").openCursor(IDBKeyRange.only(t)).then(function e(t){if(t)return n.push(t.value),t.continue().then(e)}).then(()=>n))},getRestaurantsByNeighborhood:t=>{var n=[];return dbPromise.then(r=>r.transaction(e).objectStore(e).index("by-neighborhood").openCursor(IDBKeyRange.only(t)).then(function e(t){if(t)return n.push(t.value),t.continue().then(e)}).then(()=>n))},getRestaurantsByCuisineAndNeighborhood:(t,n)=>"all"===t&&"all"===n?this.DBHelper.getAllRestaurants():"all"===t&&"all"!==n?this.DBHelper.getRestaurantsByNeighborhood(n):"all"!==t&&"all"===n?this.DBHelper.getRestaurantsByCuisine(t):dbPromise.then(r=>{var o=[];return r.transaction(e).objectStore(e).index("by-neighborhood-cuisine").openCursor(IDBKeyRange.only([n,t])).then(function e(t){if(t)return o.push(t.value),t.continue().then(e)}).then(()=>o)}),mapMarkerForRestaurant:(e,t)=>{return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})},urlForRestaurant:e=>`./restaurant.html?id=${e.id}`,imageUrlForRestaurant:e=>e.photograph?`/img/${e.photograph}.webp`:"/img/Map_placeholder.svg"}}();
//# sourceMappingURL=../maps/js/dbhelper.js.map
