let restaurants,neighborhoods,cuisines;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()});const fetchNeighborhoods=()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=(e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})},fetchCuisines=()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=(e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})};window.initMap=(()=>{const e=document.getElementById("map");self.map=new google.maps.Map(e,{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()});const lazyLoadImages=()=>{const e=document.querySelectorAll(".restaurant-img");if("IntersectionObserver"in window){let t=new IntersectionObserver(e=>{e.forEach(e=>{e.intersectionRatio>0&&(t.unobserve(e.target),e.target.src=e.target.dataset.src)})},{rootMargin:"50px 0px",threshold:.01});e.forEach(e=>{t.observe(e)})}else Array.from(e).forEach(e=>e.src=e.dataset.src)},updateRestaurants=()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),s=e.selectedIndex,r=t.selectedIndex,n=e[s].value,a=t[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(n,a,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e},fillRestaurantsHTML=(e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),lazyLoadImages(),addMarkersToMap()},createRestaurantHTML=e=>{const t=document.createElement("li");t.setAttribute("role","listitem"),t.setAttribute("tabindex","0");const s=`li_title_${e.name.replace(/\s/g,"_")}`;t.setAttribute("aria-labelledby",s);const r=new Image;r.className="restaurant-img",r.setAttribute("alt",`This is a representative image of the restaurant ${e.name}`),r.setAttribute("tabindex","0"),r.title=`${e.name}`;const n=DBHelper.imageUrlForRestaurant(e);/\.svg$/.test(n)?r.dataset.src=n:r.dataset.src=`${n.replace(".webp$","-small.webp")}`,r.onerror=(()=>{this.onerror=null,this.src=this.src.replace(".webp$","jpg")}),t.append(r);const a=document.createElement("div");a.className="restaurant-description";const o=document.createElement("h2");o.id=s,o.innerHTML=e.name,a.append(o);const l=document.createElement("p");l.innerHTML=e.neighborhood,a.append(l);const c=document.createElement("p");c.innerHTML=e.address,a.append(c);const i=document.createElement("a");return i.innerHTML="View Details",i.href=DBHelper.urlForRestaurant(e),a.append(i),t.append(a),t},addMarkersToMap=(e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})};
//# sourceMappingURL=../maps/js/main.js.map
