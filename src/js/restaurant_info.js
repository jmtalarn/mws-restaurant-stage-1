/*global google DBHelper*/
let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
    fetchRestaurantFromURL((error, restaurant) => {
        if (error) { // Got an error!
            console.error(error);
        } else {
            self.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: restaurant.latlng,
                scrollwheel: false
            });
            fillBreadcrumb();
            DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
        }
    });
};

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
    if (self.restaurant) { // restaurant already fetched!
        callback(null, self.restaurant)
        return;
    }
    const id = getParameterByName('id');
    if (!id) { // no id found in URL
        const error = 'No restaurant id in URL'
        callback(error, null);
    } else {
        DBHelper.getRestaurantById(id)
            .then(restaurant=>{
                self.restaurant = restaurant;
                fillRestaurantHTML();
                callback(null, restaurant);
             })
             .catch(error=>{ console.error(error); callback(error, null);});

    }
}

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
    const imageSrc = DBHelper.getRestaurantImageUrl(restaurant);
 
    if (!/\.svg$/.test(imageSrc)){
        image.setAttribute('src' ,imageSrc); 
        image.setAttribute('srcset', `${imageSrc.replace(/\.webp$/,'-small.webp')} 320w,
                                      ${imageSrc.replace(/\.webp$/,'-medium.webp')} 640w,
                                      ${imageSrc} 800w`);
        image.onerror = ()=>{ this.onerror=null; this.src=this.src.replace(/\.webp$/,"jpg"); this.srcset=`${imageSrc.replace(/\.webp$/,'-small.jpg')} 320w,
        ${imageSrc.replace(/\.webp$/,'-medium.jpg')} 640w,
        ${imageSrc.replace(/\.webp$/,'.jpg')}.jpg 800w` }

        image.sizes = '(max-width: 800px) 100vw, 800px';
    }
    const cuisine = document.getElementById('restaurant-cuisine');
    cuisine.innerHTML = restaurant.cuisine_type;

    // fill operating hours
    if (restaurant.operating_hours) {
        fillRestaurantHoursHTML();
    }
    // fill reviews
    fillReviewsHTML();
}

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
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews = self.restaurant.reviews) => {
    const container = document.getElementById('reviews-container');
    const title = document.createElement('h3');
    title.innerHTML = 'Reviews';
    container.appendChild(title);

    if (!reviews) {
        const noReviews = document.createElement('p');
        noReviews.innerHTML = 'No reviews yet!';
        container.appendChild(noReviews);
        return;
    }
    const ul = document.getElementById('reviews-list');
    reviews.forEach(review => {
        ul.appendChild(createReviewHTML(review));
    });
    container.appendChild(ul);
}

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
    date.innerHTML = review.date;
    li.appendChild(date);

    const rating = document.createElement('p');
    rating.innerHTML = `Rating: ${review.rating}`;
    rating.classList.add('rating');
    li.appendChild(rating);

    const comments = document.createElement('p');
    comments.innerHTML = review.comments;
    li.appendChild(comments);

    return li;
}

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
}

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
}
