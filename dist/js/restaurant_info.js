let restaurant;var map;window.initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})});const fetchRestaurantFromURL=e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");if(t)DBHelper.fetchRestaurantById(t,(t,n)=>{self.restaurant=n,n?(fillRestaurantHTML(),e(null,n)):console.error(t)});else{e("No restaurant id in URL",null)}},fillRestaurantHTML=(e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;const t=document.getElementById("restaurant-img");t.setAttribute("alt",`This is a representative image of the restaurant ${e.name}`),t.title=`${e.name}`,t.className="restaurant-img";const n=DBHelper.imageUrlForRestaurant(e);t.src=n,/\.svg$/.test(n)||(t.srcset=`${n}-small.jpg 320w,\n                                        ${n}-medium.jpg 640w,\n                                        ${n}.jpg 800w`,t.sizes="(max-width: 800px) 100vw, 800px"),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=(e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let n in e){const a=document.createElement("tr"),r=document.createElement("th");r.innerHTML=n,a.appendChild(r);const s=document.createElement("td");s.innerHTML=e[n],a.appendChild(s),t.appendChild(a)}},fillReviewsHTML=(e=self.restaurant.reviews)=>{const t=document.getElementById("reviews-container"),n=document.createElement("h3");if(n.innerHTML="Reviews",t.appendChild(n),!e){const e=document.createElement("p");return e.innerHTML="No reviews yet!",void t.appendChild(e)}const a=document.getElementById("reviews-list");e.forEach(e=>{a.appendChild(createReviewHTML(e))}),t.appendChild(a)},createReviewHTML=e=>{const t=document.createElement("li");t.setAttribute("tabindex","0");const n=document.createElement("p");n.classList.add("name"),n.innerHTML=e.name,t.appendChild(n);const a=document.createElement("p");a.classList.add("date"),a.innerHTML=e.date,t.appendChild(a);const r=document.createElement("p");r.innerHTML=`Rating: ${e.rating}`,r.classList.add("rating"),t.appendChild(r);const s=document.createElement("p");return s.innerHTML=e.comments,t.appendChild(s),t},fillBreadcrumb=(e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),n=document.createElement("li"),a=document.createElement("a");a.setAttribute("disabled","disabled"),a.innerHTML=e.name,a.href="#",a.setAttribute("aria-current","page"),n.appendChild(a),t.appendChild(n)},getParameterByName=(e,t)=>{t||(t=window.location.href),e=e.replace(/[[]]/g,"\\$&");const n=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null};
//# sourceMappingURL=../maps/js/restaurant_info.js.map
