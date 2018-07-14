/*global google DBHelper*/
let restaurant;
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    initMap();
});

/**
 * Initialize leaflet map
 */
initMap = () => {
    fetchRestaurantFromURL((error, restaurant) => {
        if (error) { // Got an error!
            console.error(error);
        } else {
            self.newMap = L.map('map', {
                center: [ restaurant.latlng.lat, restaurant.latlng.lng ],
                zoom: 16,
                scrollWheelZoom: false
            });
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
                mapboxToken: 'pk.eyJ1Ijoiam10YWxhcm4iLCJhIjoiY2pqYWphNDhhMzJ5ejNwbW5ycWNhZnVkZiJ9.xT8oDylK0cBMgHuy66xCKA',
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(newMap);
            fillBreadcrumb();
            DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
        }
    });
};  

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
    if (self.restaurant) { // restaurant already fetched!
        callback(null, self.restaurant);
        return;
    }
    const id = getParameterByName('id');
    if (!id) { // no id found in URL
        const error = 'No restaurant id in URL';
        callback(error, null);
    } else {
        DBHelper.getRestaurantById(parseInt(id))
            .then(restaurant=>{
                self.restaurant = restaurant;
                fillRestaurantHTML();
                callback(null, restaurant);
            })
            .catch(error=>{ console.error(error); callback(error, null);});

    }
};

/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (restaurant = self.restaurant) => {
    const name = document.getElementById('restaurant-name');
    name.innerHTML = restaurant.name;

    const address = document.getElementById('restaurant-address');
    address.innerHTML = restaurant.address;

    const image = document.getElementById('restaurant-img');
    image.setAttribute('alt',`This is a representative image of the restaurant ${restaurant.name}`);
    image.title=`${restaurant.name}`;
    image.className = 'restaurant-img';
    const imageSrc = DBHelper.imageUrlForRestaurant(restaurant);
 
    if (!/\.svg$/.test(imageSrc)){
        image.setAttribute('src' ,imageSrc); 
        image.setAttribute('srcset', `${imageSrc.replace(/\.webp$/,'-small.webp')} 320w,
                                      ${imageSrc.replace(/\.webp$/,'-medium.webp')} 640w,
                                      ${imageSrc} 800w`);
        image.onerror = ()=>{ this.onerror=null; this.src=this.src.replace(/\.webp$/,'jpg'); this.srcset=`${imageSrc.replace(/\.webp$/,'-small.jpg')} 320w,
        ${imageSrc.replace(/\.webp$/,'-medium.jpg')} 640w,
        ${imageSrc.replace(/\.webp$/,'.jpg')}.jpg 800w`; };

        image.sizes = '(max-width: 800px) 100vw, 800px';
    }
    const cuisine = document.getElementById('restaurant-cuisine');
    cuisine.innerHTML = restaurant.cuisine_type;
  
    createFavIcon(restaurant, 'restaurant_detail', document.getElementById('restaurant-container'));
   
    // fill operating hours
    if (restaurant.operating_hours) {
        fillRestaurantHoursHTML();
    }
    // fill reviews
    fillReviewsHTML(restaurant);
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
    const hours = document.getElementById('restaurant-hours');
    for (let key in operatingHours) {
        const row = document.createElement('tr');

        const day = document.createElement('th');
        day.innerHTML = key;
        row.appendChild(day);

        const time = document.createElement('td');
        time.innerHTML = operatingHours[key];
        row.appendChild(time);

        hours.appendChild(row);
    }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (restaurant) => {
    const container = document.getElementById('reviews-container');
    const reviewsPromise = DBHelper.getReviewsForRestaurant(restaurant.id);
    reviewsPromise.then(reviews=>{
        const ul = document.getElementById('reviews-list');
        if (!reviews || reviews.length==0) {
            const noReviews = document.createElement('p');
            noReviews.innerHTML = 'No reviews yet!';
            ul.appendChild(noReviews);
            return;
        }

        reviews.forEach(review => {
            ul.appendChild(createReviewHTML(review));
        });
        container.appendChild(ul);

    });

    setFormReviewRestaurantId(restaurant);
};

const setFormReviewRestaurantId = (restaurant)=>{

    const restaurantIdField = document.querySelector('#reviews-form [name=restaurant_id]');
    restaurantIdField.value = restaurant.id;
};
const submitReview = (form)=>{

    DBHelper.postReviewForRestaurant(
        {
            'restaurant_id': form.restaurant_id.value,
            'name': form.name.value,
            'rating': form.rating.value,
            'comments': form.comments.value
        }
    ).then(
        result=>{
            console.log('Result after submit form', result);
            form.reset();
            const container = document.getElementById('reviews-list');
            container.innerHTML='';
            fillReviewsHTML(self.restaurant);
        } 
    );
};
/**
                             * Create review HTML and add it to the webpage.
                             */
const createReviewHTML = (review) => {
    const li = document.createElement('li');
    li.setAttribute('tabindex','0');
    
    const name = document.createElement('p');
    name.classList.add('name');
    name.innerHTML = review.name;
    li.appendChild(name);

    const date = document.createElement('p');
    date.classList.add('date');
    date.innerHTML = new Date(review.createdAt).toLocaleString();
    li.appendChild(date);

    const rating = document.createElement('p');
    rating.innerHTML = `Rating <span style="font-style: normal">⭐</span> ${review.rating}`;
    rating.classList.add('rating');
    li.appendChild(rating);

    const comments = document.createElement('p');
    comments.innerHTML = review.comments;
    li.appendChild(comments);

    return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant=self.restaurant) => {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.setAttribute('disabled','disabled');
    a.innerHTML = restaurant.name;
    a.href='#';
    a.setAttribute('aria-current','page');

    li.appendChild(a);
    
    breadcrumb.appendChild(li);
};
const postRestaurantReview = (form)=>{
    console.log('postRestaurantReview', {event, form});
};
/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
    if (!url)
        url = window.location.href;
    name = name.replace(/[[]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
