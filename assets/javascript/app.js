var heroNames = ['Hulk', 'Iron man', 'Captain America', 'Thor', 'Black Widow'];
var heroIds = ['hulk', 'irnMn', 'cptnA', 'thor', 'blkWdw'];
var villainNames = ['Loki', "Stan Lee", "Magneto", 'Red Skull', 'Ultron'];
var villainIds = ['loki', 'sLee', 'mag', 'rSkl', 'ult'];

var second = false;



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



function panelCreate(arrName, arrId, hv) {
    $('#'+ hv + 'List').empty();
    for(i=0;i<arrName.length;i++) {
        var hero = $('<a>', {class: 'thumbnail char'});
        var heroImage = $('<img>', {id: arrId[i], src: ('assets/images/' + arrId[i] + ".jpg"), alt: arrName[i]});
            heroImage.css("width", "100%");
            heroImage.css("height", "75px");
        hero.append(heroImage);
        hero.append('<h3>' + arrName[i] + '</h3>');
        hero.attr('value', hv)
        $('#'+ hv + 'List').append(hero);
    }
};

panelCreate(heroNames, heroIds, 'hero');
panelCreate(villainNames, villainIds, 'villain');



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

    var count;
    var yourWins;
    var oppWins;



    function battle(o1, h1, d1, chnc1, o2, h2, d2, chnc2) {

            yourWins = 0;
            oppWins = 0;

            for(var i = 1; i <= 100; i++) {

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
                    };


                    if(chnc1 > dodge1) {
                        oppDmg -= o1;
                    } else {
                    };
                    fight = true;
                    } else {
                        fight = false;

                    if(yourDmg > 0) {

                        yourWins++;

                    } else {
                        oppWins++;

                    };

                };

            };

        };

    };




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
            var charNameStats = $(this).children('h3').html();
            var charIdStats = $(this).children('img').attr('id');


            var charInfo = $("<h1>")
                    charInfo.html(charNameStats);
                    charInfo.append("<p>villain/Hero Info Here</p>"); // will be mHeroInfo
            charboxStats = $("<div>", {id: charIdStats, class: 'text-center panel-body'});
                    charboxStats.css("background-color", "black")
                    charboxStats.css("color", "white")
                    charboxStats.addClass("panel panel-default")
                    charboxStats.append(charInfo);
                    $('#infoBox').append(charboxStats);


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
        });

var charboxStats;
var fightBtn = $('<button class="button">fight</button>');
var doneBtn = $('<button class="button" id="reset">done</button>');
var yourName;
var oppName;
       
        $('.char').click(function() {

            var charName = $(this).children('h3').html();
            var charId = $(this).children('img').attr('id');
            var hv = $(this).attr('value');
            console.log(hv);
            if (hv === 'villain') {
              hv = 'villainsList';
            } else {
              hv = 'heroesList';
            };

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
                }
                else if (charId === 'hulk' || charId === 'loki') {
                    animated = results[2].images.fixed_height.url;
                }
                else if (charId === 'thor') {
                    animated = results[3].images.fixed_height.url;
                }
                else if (charId === 'rSkl') {
                    animated = results[12].images.fixed_height.url;
                }
                else if (charId === 'irnMn') {
                    animated = results[6].images.fixed_height.url;
                }

                console.log(animated);

                heroAnimated = $("<img>");
                    heroAnimated.attr("src", animated);
                    heroAnimated.css("width", "100%");
                    heroAnimated.css("height", "200px");
                    heroAnimated.addClass("hero-image");
                    console.log(heroAnimated);

                var charBox = $("<div>", {id: charName, class: 'text-center panel-body'});
                    charBox.css("background-color", "black")
                    charBox.css("color", "white")
                    charBox.addClass("panel panel-default")
                    var charInfo = $("<h1>")
                    charInfo.html(charName);
                    charBox.append(charInfo);
                    charBox.append(heroAnimated);

                    if (second === true) {
                      $('#infoBox').empty();
                      $('#fight').append(fightBtn);
                      $('#statBoxTwo').html(charBox);
                      $('.villain').hide();
                      $('.hero').hide();

                      ref.on("value", function(snapshot) {
                        var grab = snapshot.val();
                          //grab opponenet's initial stats from firebase
                          oppAtk = grab[hv][charId].atk;
                          oppStr = grab[hv][charId].str;
                          oppInt = grab[hv][charId].int;
                          oppSpd = grab[hv][charId].spd;
                          oppNrg = grab[hv][charId].nrg;

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
                          oppHp = grab[hv][charId].dur*500;
                          console.log(oppHp);
                          oppName = charName;

                        });
                  } else {
                      $('#statBoxOne').append(charBox);
                      second = true;
                      ref.on("value", function(snapshot) {


                          var grab = snapshot.val();

                            //grab initial chosen char's stats from firebase
                            yourAtk = grab[hv][charId].atk;
                            yourStr = grab[hv][charId].str;
                            yourInt = grab[hv][charId].int;
                            yourSpd = grab[hv][charId].spd;
                            yourNrg = grab[hv][charId].nrg;

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
                            yourHp = grab[hv][charId].dur*500;
                            console.log(yourHp);
                            yourName = charName;

                            ////////////////////////////////////////////////////////////
                      
                        // battle(yourO, yourHp, yourD, yourChnc, oppO, oppHp, oppD, oppChnc);

                    });
                  }
                });
        });


        $('#done').click(function() {
          console.log("something");
          $('.villain').show();
          $('.hero').show();
          $('#infoBox').empty();
          $('#statBoxOne').empty();
          $('#statBoxTwo').empty();
          $('#fight').empty();
          $('#chart').empty();
          $('#done').empty();
        });

var color;
'use strict';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(54, 162, 235)',
    
};

color = Chart.helpers.color;


var horizontalBarChartData;
        $('#fight').click(function() {

             // this is my <canvas> element
            $('#chart').remove('#canvas');
            $('#chart').append('<canvas id="canvas"><canvas>');

            horizontalBarChartData = {
              labels: ["Durability/100", "Energy", "Fighting", "Intelligence", "Speed", "Strength"],
              datasets: [{
                  label: yourName,
                  backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.red,
                  borderWidth: 1,
                  data: [
                      (yourD/100),
                      yourNrg,
                      yourAtk,
                      yourInt,
                      yourSpd,
                      yourStr
                  ]
              }, {
                  label: oppName,
                  backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.blue,
                  data: [
                      (oppD/100),
                      oppNrg,
                      oppAtk,
                      oppInt,
                      oppSpd,
                      oppStr
                  ]
              }]
          };

            var ctx = document.getElementById("canvas").getContext("2d");
              window.myHorizontalBar = new Chart(ctx, {
                  type: 'horizontalBar',
                  data: horizontalBarChartData,
                  options: {
                      // Elements options apply to all of the options unless overridden in a dataset
                      // In this case, we are setting the border of each horizontal bar to be 2px wide
                      elements: {
                          rectangle: {
                              borderWidth: 2,
                          }
                      },
                      responsive: true,
                      legend: {
                          position: 'right',
                      },
                      title: {
                          display: true,
                          text: 'Fighter Data Comparison'
                      }
                  }
              });

          $("#canvas").addClass("panel-body");
          $("#canvas").css("background-color", 'black');
          $("#canvas").css("background-color", "black")
          $("#canvas").css("color", "white")
          $("#canvas").addClass("panel panel-default")

          battle(yourO, yourHp, yourD, yourChnc, oppO, oppHp, oppD, oppChnc);

          var battleInfoP = $('<p> ' + yourName + " would win " + yourWins + " out of 100 battles! </p>")

          console.log(battleInfo);
          $('#infoBox').empty();
          
          var battleInfo = $("<div>", {class: 'text-center panel-body'});
                    battleInfo.css("background-color", "black")
                    battleInfoP.css("color", "white")
                    battleInfo.addClass("panel panel-default")
                    battleInfo.append(battleInfoP);
          $('#infoBox').append(battleInfo);

          $('#infoBox').append();
          $('#statBoxOne').empty();
          $('#statBoxTwo').empty();
          $('#fight').empty();
          $('#done').append(doneBtn);
          console.log(doneBtn);
          second = false;
        });



