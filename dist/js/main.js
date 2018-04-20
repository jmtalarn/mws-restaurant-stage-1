let restaurants,neighborhoods,cuisines;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()});const fetchNeighborhoods=()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=(e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})},fetchCuisines=()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=(e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})};window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()});const updateRestaurants=()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),s=e.selectedIndex,n=t.selectedIndex,r=e[s].value,a=t[n].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,a,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e},fillRestaurantsHTML=(e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=e=>{const t=document.createElement("li");t.setAttribute("role","listitem"),t.setAttribute("tabindex","0");const s=`li_title_${e.name.replace(/\s/g,"_")}`;t.setAttribute("aria-labelledby",s);const n=document.createElement("img");n.className="restaurant-img",n.setAttribute("alt",`This is a representative image of the restaurant ${e.name}`),n.setAttribute("tabindex","0"),n.title=`${e.name}`;const r=DBHelper.imageUrlForRestaurant(e);/\.svg$/.test(r)?n.src=r:n.src=`${r}-small.jpg`,t.append(n);const a=document.createElement("div");a.className="restaurant-description";const o=document.createElement("h2");o.id=s,o.innerHTML=e.name,a.append(o);const l=document.createElement("p");l.innerHTML=e.neighborhood,a.append(l);const i=document.createElement("p");i.innerHTML=e.address,a.append(i);const c=document.createElement("a");return c.innerHTML="View Details",c.href=DBHelper.urlForRestaurant(e),a.append(c),t.append(a),t},addMarkersToMap=(e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiXSwibmFtZXMiOlsicmVzdGF1cmFudHMiLCJuZWlnaGJvcmhvb2RzIiwiY3Vpc2luZXMiLCJtYXAiLCJtYXJrZXJzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJmZXRjaE5laWdoYm9yaG9vZHMiLCJmZXRjaEN1aXNpbmVzIiwiREJIZWxwZXIiLCJlcnJvciIsImNvbnNvbGUiLCJzZWxmIiwiZmlsbE5laWdoYm9yaG9vZHNIVE1MIiwic2VsZWN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb3JFYWNoIiwibmVpZ2hib3Job29kIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInZhbHVlIiwiYXBwZW5kIiwiZmlsbEN1aXNpbmVzSFRNTCIsImN1aXNpbmUiLCJ3aW5kb3ciLCJpbml0TWFwIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsInpvb20iLCJjZW50ZXIiLCJsYXQiLCJsbmciLCJzY3JvbGx3aGVlbCIsInVwZGF0ZVJlc3RhdXJhbnRzIiwiY1NlbGVjdCIsIm5TZWxlY3QiLCJjSW5kZXgiLCJzZWxlY3RlZEluZGV4IiwibkluZGV4IiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kIiwicmVzZXRSZXN0YXVyYW50cyIsImZpbGxSZXN0YXVyYW50c0hUTUwiLCJtIiwic2V0TWFwIiwidWwiLCJyZXN0YXVyYW50IiwiY3JlYXRlUmVzdGF1cmFudEhUTUwiLCJhZGRNYXJrZXJzVG9NYXAiLCJsaSIsInNldEF0dHJpYnV0ZSIsInRpdGxlX2lkIiwibmFtZSIsInJlcGxhY2UiLCJpbWFnZSIsImNsYXNzTmFtZSIsInRpdGxlIiwiaW1hZ2VTcmMiLCJpbWFnZVVybEZvclJlc3RhdXJhbnQiLCJ0ZXN0Iiwic3JjIiwiZGl2IiwiaWQiLCJhZGRyZXNzIiwibW9yZSIsImhyZWYiLCJ1cmxGb3JSZXN0YXVyYW50IiwibWFya2VyIiwibWFwTWFya2VyRm9yUmVzdGF1cmFudCIsImFk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VSxHQUFLWCxFQUNWQyxFQUFLakMsVUFBWTJCLEVBQVdNLEtBQzVCUyxFQUFJeEMsT0FBTytCLEdBRVgsTUFBTXBDLEVBQWViLFNBQVNlLGNBQWMsS0FDNUNGLEVBQWFHLFVBQVkyQixFQUFXOUIsYUFDcEM2QyxFQUFJeEMsT0FBT0wsR0FFWCxNQUFNK0MsRUFBVTVELFNBQVNlLGNBQWMsS0FDdkM2QyxFQUFRNUMsVUFBWTJCLEVBQVdpQixRQUMvQkYsRUFBSXhDLE9BQU8wQyxHQUVYLE1BQU1DLEVBQU83RCxTQUFTZSxjQUFjLEtBT3BDLE9BTkE4QyxFQUFLN0MsVUFBWSxlQUNqQjZDLEVBQUtDLEtBQU96RCxTQUFTMEQsaUJBQWlCcEIsR0FDdENlLEVBQUl4QyxPQUFPMkMsR0FFWGYsRUFBRzVCLE9BQU93QyxHQUVIWixHQU1MRCxnQkFBa0IsQ0FBQ2xELEVBQWNhLEtBQUtiLGVBQ3hDQSxFQUFZaUIsUUFBUStCLElBRWhCLE1BQU1xQixFQUFTM0QsU0FBUzRELHVCQUF1QnRCLEVBQVluQyxLQUFLVixLQUNoRXlCLE9BQU9DLEtBQUt0QixNQUFNZ0UsWUFBWUYsRUFBUSxRQUFTLEtBQzNDM0MsT0FBTzhDLFNBQVNMLEtBQU9FLEVBQU9JLE1BRWxDNUQsS0FBS1QsUUFBUXNFLEtBQUtMIiwiZmlsZSI6ImpzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBnb29nbGUgREJIZWxwZXIqL1xyXG5sZXQgcmVzdGF1cmFudHMsXHJcbiAgICBuZWlnaGJvcmhvb2RzLFxyXG4gICAgY3Vpc2luZXM7XHJcbnZhciBtYXBcclxudmFyIG1hcmtlcnMgPSBbXVxyXG5cclxuXHJcbi8qKlxyXG4gKiBGZXRjaCBuZWlnaGJvcmhvb2RzIGFuZCBjdWlzaW5lcyBhcyBzb29uIGFzIHRoZSBwYWdlIGlzIGxvYWRlZC5cclxuICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpID0+IHtcclxuICAgIGZldGNoTmVpZ2hib3Job29kcygpO1xyXG4gICAgZmV0Y2hDdWlzaW5lcygpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyBhbmQgc2V0IHRoZWlyIEhUTUwuXHJcbiAqL1xyXG5jb25zdCBmZXRjaE5laWdoYm9yaG9vZHMgPSAoKSA9PiB7XHJcbiAgICBEQkhlbHBlci5mZXRjaE5laWdoYm9yaG9vZHMoKGVycm9yLCBuZWlnaGJvcmhvb2RzKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7IC8vIEdvdCBhbiBlcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLm5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzO1xyXG4gICAgICAgICAgICBmaWxsTmVpZ2hib3Job29kc0hUTUwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBuZWlnaGJvcmhvb2RzIEhUTUwuXHJcbiAqL1xyXG5jb25zdCBmaWxsTmVpZ2hib3Job29kc0hUTUwgPSAobmVpZ2hib3Job29kcyA9IHNlbGYubmVpZ2hib3Job29kcykgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25laWdoYm9yaG9vZHMtc2VsZWN0Jyk7XHJcbiAgICBuZWlnaGJvcmhvb2RzLmZvckVhY2gobmVpZ2hib3Job29kID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gbmVpZ2hib3Job29kO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IG5laWdoYm9yaG9vZDtcclxuICAgICAgICBzZWxlY3QuYXBwZW5kKG9wdGlvbik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZldGNoIGFsbCBjdWlzaW5lcyBhbmQgc2V0IHRoZWlyIEhUTUwuXHJcbiAqL1xyXG5jb25zdCBmZXRjaEN1aXNpbmVzID0gKCkgPT4ge1xyXG4gICAgREJIZWxwZXIuZmV0Y2hDdWlzaW5lcygoZXJyb3IsIGN1aXNpbmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7IC8vIEdvdCBhbiBlcnJvciFcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5jdWlzaW5lcyA9IGN1aXNpbmVzO1xyXG4gICAgICAgICAgICBmaWxsQ3Vpc2luZXNIVE1MKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgY3Vpc2luZXMgSFRNTC5cclxuICovXHJcbmNvbnN0IGZpbGxDdWlzaW5lc0hUTUwgPSAoY3Vpc2luZXMgPSBzZWxmLmN1aXNpbmVzKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vpc2luZXMtc2VsZWN0Jyk7XHJcblxyXG4gICAgY3Vpc2luZXMuZm9yRWFjaChjdWlzaW5lID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gY3Vpc2luZTtcclxuICAgICAgICBvcHRpb24udmFsdWUgPSBjdWlzaW5lO1xyXG4gICAgICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBHb29nbGUgbWFwLCBjYWxsZWQgZnJvbSBIVE1MLlxyXG4gKi9cclxud2luZG93LmluaXRNYXAgPSAoKSA9PiB7XHJcbiAgICBsZXQgbG9jID0ge1xyXG4gICAgICAgIGxhdDogNDAuNzIyMjE2LFxyXG4gICAgICAgIGxuZzogLTczLjk4NzUwMVxyXG4gICAgfTtcclxuICAgIHNlbGYubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICB6b29tOiAxMixcclxuICAgICAgICBjZW50ZXI6IGxvYyxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdXBkYXRlUmVzdGF1cmFudHMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBwYWdlIGFuZCBtYXAgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMuXHJcbiAqL1xyXG5jb25zdCB1cGRhdGVSZXN0YXVyYW50cyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vpc2luZXMtc2VsZWN0Jyk7XHJcbiAgICBjb25zdCBuU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25laWdoYm9yaG9vZHMtc2VsZWN0Jyk7XHJcblxyXG4gICAgY29uc3QgY0luZGV4ID0gY1NlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG4gICAgY29uc3QgbkluZGV4ID0gblNlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgIGNvbnN0IGN1aXNpbmUgPSBjU2VsZWN0W2NJbmRleF0udmFsdWU7XHJcbiAgICBjb25zdCBuZWlnaGJvcmhvb2QgPSBuU2VsZWN0W25JbmRleF0udmFsdWU7XHJcblxyXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKGN1aXNpbmUsIG5laWdoYm9yaG9vZCwgKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikgeyAvLyBHb3QgYW4gZXJyb3IhXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc2V0UmVzdGF1cmFudHMocmVzdGF1cmFudHMpO1xyXG4gICAgICAgICAgICBmaWxsUmVzdGF1cmFudHNIVE1MKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIENsZWFyIGN1cnJlbnQgcmVzdGF1cmFudHMsIHRoZWlyIEhUTUwgYW5kIHJlbW92ZSB0aGVpciBtYXAgbWFya2Vycy5cclxuICovXHJcbmNvbnN0IHJlc2V0UmVzdGF1cmFudHMgPSAocmVzdGF1cmFudHMpID0+IHtcclxuICAgIC8vIFJlbW92ZSBhbGwgcmVzdGF1cmFudHNcclxuICAgIHNlbGYucmVzdGF1cmFudHMgPSBbXTtcclxuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnRzLWxpc3QnKTtcclxuICAgIHVsLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgbWFwIG1hcmtlcnNcclxuICAgIHNlbGYubWFya2Vycy5mb3JFYWNoKG0gPT4gbS5zZXRNYXAobnVsbCkpO1xyXG4gICAgc2VsZi5tYXJrZXJzID0gW107XHJcbiAgICBzZWxmLnJlc3RhdXJhbnRzID0gcmVzdGF1cmFudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYWxsIHJlc3RhdXJhbnRzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxyXG4gKi9cclxuY29uc3QgZmlsbFJlc3RhdXJhbnRzSFRNTCA9IChyZXN0YXVyYW50cyA9IHNlbGYucmVzdGF1cmFudHMpID0+IHtcclxuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnRzLWxpc3QnKTtcclxuICAgIHJlc3RhdXJhbnRzLmZvckVhY2gocmVzdGF1cmFudCA9PiB7XHJcbiAgICAgICAgdWwuYXBwZW5kKGNyZWF0ZVJlc3RhdXJhbnRIVE1MKHJlc3RhdXJhbnQpKTtcclxuICAgIH0pO1xyXG4gICAgYWRkTWFya2Vyc1RvTWFwKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcmVzdGF1cmFudCBIVE1MLlxyXG4gKi9cclxuY29uc3QgY3JlYXRlUmVzdGF1cmFudEhUTUwgPSAocmVzdGF1cmFudCkgPT4ge1xyXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgbGkuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3RpdGVtJyk7XHJcbiAgICBsaS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZV9pZCA9IGBsaV90aXRsZV8ke3Jlc3RhdXJhbnQubmFtZS5yZXBsYWNlKC9cXHMvZywnXycpfWA7XHJcblxyXG4gICAgbGkuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCB0aXRsZV9pZCk7XHJcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NOYW1lID0gJ3Jlc3RhdXJhbnQtaW1nJztcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgYFRoaXMgaXMgYSByZXByZXNlbnRhdGl2ZSBpbWFnZSBvZiB0aGUgcmVzdGF1cmFudCAke3Jlc3RhdXJhbnQubmFtZX1gKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgaW1hZ2UudGl0bGUgPSBgJHtyZXN0YXVyYW50Lm5hbWV9YDtcclxuICAgIGNvbnN0IGltYWdlU3JjID0gREJIZWxwZXIuaW1hZ2VVcmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpO1xyXG4gICAgaWYgKCEvXFwuc3ZnJC8udGVzdChpbWFnZVNyYykpeyAgICBcclxuICAgICAgICBpbWFnZS5zcmMgPSBgJHtpbWFnZVNyY30tc21hbGwuanBnYDtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGltYWdlLnNyYz1pbWFnZVNyYztcclxuICAgIH1cclxuXHJcbiAgICBsaS5hcHBlbmQoaW1hZ2UpO1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3Jlc3RhdXJhbnQtZGVzY3JpcHRpb24nO1xyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBuYW1lLmlkID0gdGl0bGVfaWQ7XHJcbiAgICBuYW1lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQubmFtZTtcclxuICAgIGRpdi5hcHBlbmQobmFtZSlcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvcmhvb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBuZWlnaGJvcmhvb2QuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uZWlnaGJvcmhvb2Q7XHJcbiAgICBkaXYuYXBwZW5kKG5laWdoYm9yaG9vZCk7XHJcblxyXG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGFkZHJlc3MuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5hZGRyZXNzO1xyXG4gICAgZGl2LmFwcGVuZChhZGRyZXNzKTtcclxuXHJcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgbW9yZS5pbm5lckhUTUwgPSAnVmlldyBEZXRhaWxzJztcclxuICAgIG1vcmUuaHJlZiA9IERCSGVscGVyLnVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCk7XHJcbiAgICBkaXYuYXBwZW5kKG1vcmUpO1xyXG5cclxuICAgIGxpLmFwcGVuZChkaXYpO1xyXG5cclxuICAgIHJldHVybiBsaTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgbWFya2VycyBmb3IgY3VycmVudCByZXN0YXVyYW50cyB0byB0aGUgbWFwLlxyXG4gKi9cclxuY29uc3QgYWRkTWFya2Vyc1RvTWFwID0gKHJlc3RhdXJhbnRzID0gc2VsZi5yZXN0YXVyYW50cykgPT4ge1xyXG4gICAgcmVzdGF1cmFudHMuZm9yRWFjaChyZXN0YXVyYW50ID0+IHtcclxuICAgICAgICAvLyBBZGQgbWFya2VyIHRvIHRoZSBtYXBcclxuICAgICAgICBjb25zdCBtYXJrZXIgPSBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIHNlbGYubWFwKTtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYXJrZXIudXJsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYubWFya2Vycy5wdXNoKG1hcmtlcik7XHJcbiAgICB9KTtcclxufSJdfQ==
