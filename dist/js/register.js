"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}).catch(function(e){console.log("ServiceWorker registration failed: ",e)})});
//# sourceMappingURL=../maps/js/register.js.map
