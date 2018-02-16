function getRandomColor() {
    return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) +
        ", " + Math.floor(Math.random() * 256) + ")";
}

function getCity() {
    return document.getElementById("user_choice").value;
}

function setCity() {
    document.getElementById("robot_choice").value = nameCity;
}
function searchCheck(nameCity) {
    for(var i = 0; i < city.length; i++){
        if(city[i] == nameCity){
            city[i] = "_";
            return true;
        }
    }
    return false;
}

function playUser() {
    nameCity = getCity();
    var firstLetter = nameCity.charAt(0);
    if(!unchecked){
        firstLetter = firstLetter.toLowerCase();
        if(lastCity.charAt(lastCity.length - 1).toLowerCase() != firstLetter){
            return false;
        }
    }
    firstLetter = firstLetter.toUpperCase();
    nameCity = firstLetter.concat(nameCity.slice(1, nameCity.length));
    if(searchCheck(nameCity)){
        lastLetter = nameCity.charAt(nameCity.length - 1).toUpperCase();
        lastCity = JSON.parse(JSON.stringify(nameCity));
        unchecked = false;
        change();
        return true;
    }
    return false;

}

function robotPlay() {
    nameCity = cityRobot(lastLetter);
    if (nameCity == "Нет возможных вариантов"){
        return false;
    }
    lastCity = JSON.parse(JSON.stringify(nameCity));
    change();
    setCity();
    console.log(lastCity);
    console.log(nameCity);
    return true;
}

function cityRobot(lastLetter) {
    var result;
    var indexArray = [];
    for(var index = 0; index < city.length; index++){
        if(city[index].charAt(0) == lastLetter){
            indexArray.push(index);
        }
    }
    if(indexArray === []){
        return "Нет возможных вариантов";
    }
    else {
        var i = Math.floor(Math.random() * indexArray.length);
        result = JSON.parse(JSON.stringify(city[indexArray[i]]));
        city[indexArray[i]] = '_';
        return result;
    }
}

function wait(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}

function change(){
    ymaps.geocode(nameCity, {
        results: 1,
        kind: 'locality'
    }).then(
        function (res) {
            var firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates();
            myMap.setCenter(coords, 8);
            console.log(coords);
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
                preset: 'islands#dotIcon',
                iconColor: getRandomColor()
            });
            myMap.geoObjects.add(myPlacemark);
        },
        function (err) {
            console.log("error");
        }
    );
}

function viewMessage(text) {
    $('.message').text(text).fadeIn(1000);
    wait(1000);
    $('.message').fadeOut(1000);
}

function init() {
    document.getElementById("sumb_2").disabled = true;
    myMap = new ymaps.Map("map", {
        center: [x, y],
        zoom: 8,
        controls: []
    });
}

