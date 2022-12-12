const api = 'https://geo.ipify.org/api/v2/country,city?apiKey='; 
const apiKey = 'at_mzCEinScHa7QTAjGtsWNZbO27JBNi&ipAddress=';
let keyCode = document.getElementById('search');
let finalUrl = api + apiKey + keyCode;
const submit = document.getElementById('btnSearch');

// fetch my data from The API
const getInfo = async (finalUrl)=>{
    const response = await fetch(finalUrl);
    try{
        const mydate = await response.json();
        mydate.code == 422 ?  keyCode.style.cssText='color:red':keyCode.style.cssText='color:#000'; console.log(mydate);
        return mydate;
        
    } catch(error){ // if there any error say where is it
        alert('your error is :'+error);
        console.log('your error is :'+error);
    }
}
// map and the style of it
var map = L.map('map');
L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=nX9wkFD9ZupSofktAvOL', {
    maxZoom: 19,
}).addTo(map);


function iamHere(){ getInfo(api+apiKey+keyCode.value)
.then(function ( mydata ){
//get the data from API
    const country = mydata.location.country;
    const region = mydata.location.region;
    const ipAddress = mydata.ip;
    const timezone =  mydata.location.timezone;
    const isp = mydata.isp;
    const lat = mydata.location.lat;
    const lng =  mydata.location.lng
    document.querySelector('ul').style.cssText='left: 10vw;';
    document.querySelector('#returnMe').style.cssText='transform:scale(0); transition-duration: 1s;'
    document.getElementById('ipAddress').innerHTML = ipAddress;
    document.getElementById('search').value = ipAddress;
    document.getElementById('loca').innerHTML = `${country},${region}`;
    document.getElementById('timezone').innerHTML = `UTC${timezone}`;
    document.getElementById('isp').innerHTML = isp;
    document.createAttribute('div','isp').innerHTML = mydata.messages;
//go to the Latitude and longitude which the user enter
    map.setView([lat, lng], 13)
// put the popup in Latitude and longitude
    var popup = L.popup();
    var marker = L.marker([lat, lng]);   
    marker.addTo(map);   

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); 
//get Latitude and longitude where clicked in the map
    function onMapClick(e) {
      
      popup //this from leaflet data
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }
    map.on('click', onMapClick);

});}
iamHere()

document.querySelector('svg').addEventListener('click',()=> {
    document.querySelector('ul').style.cssText='left: 100vw;transform:  scale(0); '
    document.querySelector('#returnMe').style.cssText='transform: rotate(180deg) scale(1); transition-duration: 1s; left:94vw'
})
document.querySelector('#returnMe').addEventListener('click',()=> {
    document.querySelector('ul').style.cssText='left: 10vw;'
    document.querySelector('#returnMe').style.cssText='transform:scale(0); transition-duration:1s;'
})