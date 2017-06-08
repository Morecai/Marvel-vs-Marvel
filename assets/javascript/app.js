$(document).ready(function() {

    var audioE = document.createElement("audio");
    audioE.setAttribute("src", "Assets/black.mp3");
    $(".btn").on("click", function() {
        audioE.play();
    });
 

    var heroNames = ['Hulk', 'Iron man', 'Captain America', 'Thor', 'Black Widow'];
    var heroIds = ['hulk', 'irnMn', 'cptnA', 'thor', 'blkWdw'];
    var villainNames = ['Loki', "Stan Lee", "Magneto", 'Red Skull', 'Ultron'];
    var villainIds = ['loki', 'sLee', 'mag', 'rSkl', 'ult'];

    var second = false;

    function panelCreate(arrName, arrId, hv) {
        $('#' + hv + 'List').empty();
        for (i = 0; i < arrName.length; i++) {
            var hero = $('<a>', { class: 'thumbnail char' });
            var heroImage = $('<img>', { id: arrId[i], src: ('assets/images/' + arrId[i] + ".jpg"), alt: arrName[i] });
            heroImage.css("width", "100%");
            heroImage.css("height", "75px");
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

    var db = firebase.database();
    var ref = db.ref();

    var capCall;
    var mKey;
    var heroAnimated;
    var mHeroInfo;


    //set variable to be used globally for the battle engine 
    //initialize chosen char's stat variables
    var yourAtk;
    var yourStr;
    var yourInt;
    var yourSpd;
    var yourNrg;
    var yourO;
    var yourChnc;
    var yourD;
    var yourHp;

    //initialize opponents stat variables
    var oppAtk;
    var oppStr;
    var oppInt;
    var oppSpd;
    var oppNrg;
    var oppO;
    var oppChnc;
    var oppD;
    var oppHp;




    ref.on("value", function(snapshot) {


        var grab = snapshot.val();

        //grab initial chosen char's stats from firebase
        yourAtk = grab.villainsList.mag.atk;
        yourStr = grab.villainsList.mag.str;
        yourInt = grab.villainsList.mag.int;
        yourSpd = grab.villainsList.mag.spd;
        yourNrg = grab.villainsList.mag.nrg;

        //set chosen char's offensive power
        yourO = yourAtk+yourStr+yourInt;
        yourO = yourO*yourSpd;
        yourO = yourO*yourNrg;

        //set your chosen char's chance to hit
        yourChnc = .3;
        var atkChnc = yourAtk*.1;
        var intChnc = yourInt*.1;
        var spdChnc = yourSpd*.1;
        atkChnc +=1;
        intChnc +=1;
        spdChnc +=1;
        yourChnc = yourChnc*atkChnc;
        yourChnc = yourChnc*intChnc;
        yourChnc = yourChnc*spdChnc;


        //set chosen char's defensive power
        yourD = yourStr+yourInt;
        yourD = yourD*yourSpd;
        yourD = yourD*yourNrg;

        //set chosen char's health
        yourHp = grab.villainsList.mag.dur*500;

        /////////////////////////////////////////////////////////////

        //grab opponenet's initial stats from firebase
        oppAtk = grab.heroesList.hulk.atk;
        oppStr = grab.heroesList.hulk.str;
        oppInt = grab.heroesList.hulk.int;
        oppSpd = grab.heroesList.hulk.spd;
        oppNrg = grab.heroesList.hulk.nrg;

        //set chosen opponent's offensicve power
        oppO = oppAtk+oppStr+oppInt;
        oppO = oppO*oppSpd;
        oppO = oppO*oppNrg;

        //set your opponent's chance to hit
        oppChnc = .3
        var oppAtkChnc = oppAtk*.1;
        var oppIntChnc = oppInt*.1;
        var oppSpdChnc = oppSpd*.1;
        oppAtkChnc +=1;
        oppIntChnc +=1;
        oppSpdChnc +=1;
        oppChnc = oppChnc*oppAtkChnc;
        oppChnc = oppChnc*oppIntChnc;
        oppChnc = oppChnc*oppSpdChnc;



        //set opponent's defensive power
        oppD = oppStr+oppInt;
        oppD = oppD*oppSpd;
        oppD = oppD*oppNrg;

        //set opponent's health
        oppHp = grab.heroesList.hulk.dur*500;

        battle(yourO, yourHp, yourD, yourChnc, oppO, oppHp, oppD, oppChnc);

    });


    function battle(o1, h1, d1, chnc1, o2, h2, d2, chnc2) {

    console.log(chnc1);
    console.log(chnc2);


        for(var i = 1; i <= 10000; i++) {

            var yourDmg = h1-d2;
            var oppDmg = h2-d1;

            var fight = true;

            while(fight == true) {

                var dodge1 = Math.random();
                var dodge2 = Math.random();

                if (yourDmg > 0 && oppDmg > 0) {

                    if(chnc2 > dodge2) {

                        yourDmg -= o2;

                    } else {

                    console.log("a miss for Hulk!!!");

                };


                if(chnc1 > dodge1) {

                    oppDmg -= o1;

                } else {

                    console.log("A miss for Magneto!!");

                };

                fight = true;

                console.log(yourDmg);
                console.log(oppDmg);

                } else {

                    fight = false;

                if(yourDmg > 0) {

                    console.log("Magneto won!");

                } else {

                    console.log("Hulk's health " + oppDmg);
                    console.log("Magneto's health " + yourDmg);
                    console.log("Hulk won!");

                };

            };

        };

    };

};



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
                    animated = results[11].images.fixed_height.url;
                } else if (charId === 'irnMn') {
                    animated = results[7].images.fixed_height.url;
                }

                console.log(animated);

                heroAnimated = $("<img>");
                heroAnimated.attr("src", animated);
                heroAnimated.css("width", "100%");
                heroAnimated.css("height", "200px");
                heroAnimated.addClass("hero-image");
                console.log(heroAnimated);

                var charBox = $("<div>", { id: charName, class: 'text-center panel-body' });
                charBox.css("background-color", "black")
                charBox.css("color", "white")
                charBox.addClass("panel panel-default")
                var charInfo = $("<h1>")
                charInfo.html(charName);
                charInfo.append("<p>villain/Hero Info Here</p>"); // will be mHeroInfo
                charBox.append(charInfo);
                charBox.append(heroAnimated);
                $('#infoBox').append(charBox);
            });
    });
    var charboxStats;
    var fightBtn = $('<button class="button">fight</button>')
    $('.char').click(function() {
        var charNameClick = $(this).children('h3').html();
        var charIdClick = $(this).children('img').attr('id');
        var charInfo = $("<h1>")
        charInfo.html(charNameClick);
        charInfo.append("<p>villain/Hero Info Here</p>"); // will be mHeroInfo
        charboxStats = $("<div>", { id: charNameClick, class: 'text-center panel-body' });
        charboxStats.css("background-color", "black")
        charboxStats.css("color", "white")
        charboxStats.addClass("panel panel-default")
        charboxStats.append(charInfo);
        if (second === true) {
            $('#infoBox').empty();
            $('#fight').append(fightBtn);
            $('#statBoxTwo').append(charboxStats);
        } else {
            $('#statBoxOne').append(charboxStats);
            second = true;
        }
    });
});
