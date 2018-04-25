const CACHE_NAME = 'mws-restaurant-cache';

caches.open(CACHE_NAME).then(function(cache) {
    console.log(cache);
    const list = document.getElementById('cached-list');
    cache.keys()
        .then(keys=>keys
            .filter(request=>/\.html\?(id=\d*)$/gm.test(request.url) )
            .forEach(request=>{
                cache.match(request)
                    .then(response=>response.text())
                    .then(responseText=>{
                        var parsedResponse = (new window.DOMParser()).parseFromString(responseText, 'text/html');
                        const title = parsedResponse.title;
                        
                        const li = document.createElement('LI');
                        const link = document.createElement('A');
                        link.href = request.url;
                        link.innerHTML = `${title} ${request.url}`;
                        li.appendChild(link);
                        list.appendChild(li);
                    });  
            }));
});