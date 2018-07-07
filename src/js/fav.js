function createFavIcon(restaurant, title_id,target){
    const fav = document.createElement('span');
    fav.classList.add('fav');
    const checkbox_id = `fav_${title_id}`;
    const fav_label = document.createElement('label');

    fav_label.setAttribute('for', checkbox_id);
    fav_label.innerHTML = '❤️';

    const favCheckbox = document.createElement('input');
    favCheckbox.setAttribute('type', 'checkbox');
    favCheckbox.setAttribute('name', 'favorite');
    favCheckbox.setAttribute('data-id', restaurant.id);
    favCheckbox.setAttribute('id', checkbox_id);
    favCheckbox.addEventListener('change', toggleRestaurantFav);
    const is_favorite = (restaurant.is_favorite === 'true');
    if (is_favorite)
        favCheckbox.setAttribute('checked', 'checked');

    fav.append(favCheckbox);
    fav.append(fav_label);
    fav.setAttribute('title', 'Click on the heart to fav/unfav this restaurant');
    target.append(fav);
}
function toggleRestaurantFav(event){
    DBHelper.favRestaurant(event.target.dataset.id, event.target.checked).then(() => {
        console.log('Restaurant favs updated!');
    });
}
