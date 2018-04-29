/*global google DBHelper */
let restaurants,
    neighborhoods,
    cuisines;
var map
var markers = []
 

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    fetchNeighborhoods();
    fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
const fetchNeighborhoods = () => {
    DBHelper.getNeighborhoods()
        .then(neighborhoods => {
            self.neighborhoods = neighborhoods;
            fillNeighborhoodsHTML();
        }).catch(error=> console.error(error));
}

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
    const select = document.getElementById('neighborhoods-select');
    neighborhoods.forEach(neighborhood => {
        const option = document.createElement('option');
        option.innerHTML = neighborhood;
        option.value = neighborhood;
        select.append(option);
    });
}

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {

    DBHelper.getCuisines()
        .then(cuisines => {
            self.cuisines = cuisines;
            fillCuisinesHTML();
        }).catch(error=> console.error(error));

}

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
    const select = document.getElementById('cuisines-select');

    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.innerHTML = cuisine;
        option.value = cuisine;
        select.append(option);
    });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {

    const map = document.getElementById('map');
    let loc = {
        lat: 40.722216,
        lng: -73.987501
    };
    self.map = new google.maps.Map( map, {
        zoom: 12,
        center: loc,
        scrollwheel: false
    });
    updateRestaurants();

}
const lazyLoadImages = () =>{

    const images = document.querySelectorAll('.restaurant-img');

    const config = {
    // If the image gets within 50px in the Y axis, start the download.
    rootMargin: '50px 0px',
    threshold: 0.01
    };
    if (!('IntersectionObserver' in window)) {
        Array.from(images).forEach(image => image.src=image.dataset.src);
    } else {
        // The observer for the images on the page
        let observer = new IntersectionObserver((entries)=> {
            // Loop through the entries
            entries.forEach(entry => {
              // Are we in viewport?
              if (entry.intersectionRatio > 0) {
          
                // Stop watching and load the image
                observer.unobserve(entry.target);
                entry.target.src=entry.target.dataset.src;
              }
            });
        }, config);
      
        
        images.forEach(image => {
            observer.observe(image);
        });
    }
}
/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = () => {
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');

    const cIndex = cSelect.selectedIndex;
    const nIndex = nSelect.selectedIndex;

    const cuisine = cSelect[cIndex].value;
    const neighborhood = nSelect[nIndex].value;

    DBHelper.getRestaurantsByCuisineAndNeighborhood(cuisine, neighborhood)
        .then(restaurants=>{
            resetRestaurants(restaurants);
            fillRestaurantsHTML();
        })
        .catch(error=>console.error)
    
        
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
    // Remove all restaurants
    self.restaurants = [];
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';

    // Remove all map markers
    self.markers.forEach(m => m.setMap(null));
    self.markers = [];
    self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
    const ul = document.getElementById('restaurants-list');
    restaurants.forEach(restaurant => {
        ul.append(createRestaurantHTML(restaurant));
    });
    lazyLoadImages();
    addMarkersToMap();
    
}

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');
    li.setAttribute('tabindex', '0');

    const title_id = `li_title_${restaurant.name.replace(/\s/g,'_')}`;

    li.setAttribute('aria-labelledby', title_id);
    const image = new Image(); //document.createElement('img');
    image.className = 'restaurant-img';
    image.setAttribute('alt', `This is a representative image of the restaurant ${restaurant.name}`);
    image.setAttribute('tabindex', '0');
    image.title = `${restaurant.name}`;

    const imageSrc = DBHelper.imageUrlForRestaurant(restaurant);
    if (/\.svg$/.test(imageSrc)){    
        image.dataset.src = imageSrc;
    }else{
        image.dataset.src = `${imageSrc.replace('\.webp$','-small.webp')}`;
    }
    image.onerror = ()=>{ this.onerror=null; this.src=this.src.replace("\.webp$","jpg") }
    li.append(image);
    const div = document.createElement('div');
    div.className = 'restaurant-description';
    const name = document.createElement('h2');
    name.id = title_id;
    name.innerHTML = restaurant.name;
    div.append(name)

    const neighborhood = document.createElement('p');
    neighborhood.innerHTML = restaurant.neighborhood;
    div.append(neighborhood);

    const address = document.createElement('p');
    address.innerHTML = restaurant.address;
    div.append(address);

    const more = document.createElement('a');
    more.innerHTML = 'View Details';
    more.href = DBHelper.urlForRestaurant(restaurant);
    div.append(more);

    li.append(div);

    return li;
};

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
    restaurants.forEach(restaurant => {
        // Add marker to the map
        const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
        google.maps.event.addListener(marker, 'click', () => {
            window.location.href = marker.url;
        });
        self.markers.push(marker);
    });
}
//# sourceMappingURL=../maps/js/main.js.map
