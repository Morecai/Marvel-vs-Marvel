var heroNames = ['Hulk', 'Iron man', 'Captain America', 'Thor', 'Black Widow'];
var heroIds = ['hulk', 'irnMn', 'cptnA', 'thor', 'blkWdw'];
var villainNames = ['Loki', "Stan Lee", "Magneto", 'Red Skull', 'Ultron'];
var villainIds = ['loki', 'sLee', 'mag', 'rSkl', 'ult'];

function panelCreate(arrName, arrId, hv) {
    $('#' + hv + 'List').empty();
    for (i = 0; i < arrName.length; i++) {
        var hero = $('<a>', { class: 'thumbnail char' });
        var heroImage = $('<img>', { id: arrId[i], src: ('assets/images/' + arrId[i] + ".jpg"), alt: arrName[i] });
        heroImage.css("width", "100%");
        heroImage.css("height", "100px");
        hero.append(heroImage);
        hero.append('<h3>' + arrName[i] + '</h3>');
        $('#' + hv + 'List').append(hero);
    }
};

function fresh() {

}

panelCreate(heroNames, heroIds, 'hero');
panelCreate(villainNames, villainIds, 'villain');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAH1lZdDNKxDUb6qxpzES4fdtDjHlEudDs",
    authDomain: "marvel-vs-marvel.firebaseapp.com",
    databaseURL: "https://marvel-vs-marvel.firebaseio.com",
    projectId: "marvel-vs-marvel",
    storageBucket: "marvel-vs-marvel.appspot.com",
    messagingSenderId: "434172907026"
};

firebase.initializeApp(config);

var database = firebase.database();

var capCall;
var mKey;
var heroAnimated;
var mHeroInfo;




// database.ref().on('value', function(snapshot) {
//           capCall = snapshot.val().reqURL;
//           mKey = snapshot.val().mKey;
//           console.log(mKey);
//           var villainsList = snapshot.val().villainsList;
//           console.log(capCall);
//           for (var key in villainsList) {
//                   villainArr.push(key);
//                   console.log(villainArr);
//           }
//       });



$('.char').mouseenter(function() {
    $('#infoBox').empty();
    console.log('working');
    var charName = $(this).children('h3').html();
    var charId = $(this).children('img').attr('id');
    console.log(charName);
    console.log(charId);

    // getMarvelAPI();


    // var queryURL = capCall + charName + mKey;


    // function getMarvelAPI() {
    //         $.ajax({
    //             url: queryURL,
    //             method: 'GET'
    //         }).done(function(response) {
    //             console.log(response);
    // mHeroInfo = response.story 
    //     });
    // };

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + charName + "&api_key=dc6zaTOxFJmzC&limit=20";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            var animated = results[2].images.fixed_height.url;

            if (charId === 'cptnA') {
                animated = results[0].images.fixed_height.url;
            } else if (charId === 'hulk' || charId === 'loki') {
                animated = results[2].images.fixed_height.url;
            } else if (charId === 'thor') {
                animated = results[3].images.fixed_height.url;
            } else if (charId === 'rSkl') {
                animated = results[12].images.fixed_height.url;
            } else if (charId === 'irnMn') {
                animated = results[6].images.fixed_height.url;
            }

            console.log(animated);

            heroAnimated = $("<img>");
            heroAnimated.attr("src", animated);
            heroAnimated.css("width", "100%");
            heroAnimated.css("height", "200px");
            heroAnimated.addClass("hero-image");
            console.log(heroAnimated);

            var charBox = $("<div>", { id: charName });
            charBox.addClass("panel panel-default")
            var charInfo = $("<h1>")
            charInfo.html(charName);
            charInfo.append("<p>villain/Hero Info Here</p>"); // will be mHeroInfo
            charBox.append(charInfo);
            charBox.append(heroAnimated);
            $('#infoBox').append(charBox);
        });
});

$('.char').click(function() {
    $('#infoBox').html("working");
    console.log('working');
    var charNameClick = $(this).children('h3').html();
    var charIdClick = $(this).children('img').attr('id');
    console.log(charName);
    console.log(charId);
});

