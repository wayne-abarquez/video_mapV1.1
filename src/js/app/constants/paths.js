(function () {
    'use strict';

    var paths = [
        // GATE 11
        { // 0
            position: {"lat": 37.369379060667, "lng": -121.92972332033},
            heading: -44
        },
        { // 1
            position: {"lat": 37.369411675383, "lng": -121.92976047187},
            heading: -44
        },
        { // 2
            position: {"lat": 37.369442744334, "lng": -121.92979579528}
        },
        { // 3
            position: {"lat": 37.369471384216, "lng": -121.92982760799}
        },
        { // 4
            position: {"lat": 37.369504027008, "lng": -121.92986616192}
        },
        { // 5
            position: {"lat": 37.369533469053, "lng": -121.92989994916},
            heading: -2
        },
        { // 6
            position: {"lat": 37.369574664734, "lng": -121.92990442266}
        },


        // GATE 10
        { // 7
            position: {"lat": 37.36962050362, "lng": -121.92990178266}
        },
        { // 8
            position: {"lat": 37.369660693943, "lng": -121.92990065358}
        },
        { // 9
            position: {"lat": 37.369711802907, "lng": -121.92990237375},
            heading: -51
        },
        { // 10
            position: {"lat": 37.369745716028, "lng": -121.92992556237}
        },
        { // 11
            position: {"lat": 37.369776205073, "lng": -121.92996203767}
        },
        { // 12
            position: {"lat": 37.369808734965, "lng": -121.93000121112}
        },
        { // 13
            position: {"lat": 37.369838182256, "lng": -121.93003690475}
        },

        // GATE 9
        { // 14
            position: {"lat": 37.369862931805, "lng": -121.93006720851}
        },
        { // 15
            position: {"lat": 37.369891063479, "lng": -121.93010208881}
        },
        { // 16
            position: {"lat": 37.369916961437, "lng": -121.93013290195}
        },
        { // 17
            position: {"lat": 37.369944531673, "lng": -121.93016542236}
        },
        { // 18
            position: {"lat": 37.369971885592, "lng": -121.93019956352}
        },

        // GATE 8
        { // 19
            position: {"lat": 37.370001076154, "lng": -121.9302321116}
        },
        { // 20
            position: {"lat": 37.370030608041, "lng": -121.93026376793}
        },
        { // 21
            position: {"lat": 37.370051185248, "lng": -121.93029653093}
        },
        { // 22
            position: {"lat": 37.370107330815, "lng": -121.93030615612},
            heading: -86
        },
        { // 23
            position: {"lat": 37.370111897775, "lng": -121.93037747455}
        },
        { // 24
            position: {"lat": 37.370117428453, "lng": -121.93044105293}
        },
        { // 25
            position: {"lat": 37.370121001001, "lng": -121.93050536947}
        },
        { // 26
            position: {"lat": 37.370124795172, "lng": -121.93056343063}
        },
        { // 27
            position: {"lat": 37.370128582893, "lng": -121.93062393464}
        },
        { // 28
            position: {"lat": 37.37014343578, "lng": -121.930684373},
            heading: -51
        },
        { // 29
            position: {"lat": 37.370182672018, "lng": -121.93072657961},
            heading: -37
        },
        { // 30
            position: {"lat": 37.370217305275, "lng": -121.9307645182}
        },
        { // 31
            position: {"lat": 37.370254504745, "lng": -121.93080591173}
        },
        { // 32
            position: {"lat": 37.370291989076, "lng": -121.93084595343}
        },
        { // 33
            position: {"lat": 37.370336024608, "lng": -121.93088897126}
        },

        // GATE 7
        { // 34
            position: {"lat": 37.370361925926, "lng": -121.93091768029}
        },
        { // 35
            position: {"lat": 37.370394850435,  "lng": -121.93095390576}
        },
        { // 36
            position: {"lat": 37.370423393392,  "lng": -121.93098667786}
        },
        { // 37
            position: {"lat": 37.37045245345, "lng": -121.93101783053}
        },
        { // 38
            position: {"lat": 37.37047869784, "lng": -121.93104599213}
        },
        { // 39
            position: {"lat": 37.370516844569,  "lng": -121.93108726807}
        },
        { // 40
            position: {"lat": 37.370549536636,  "lng": -121.93112216494}
        },
        { // 41
            position: {"lat": 37.370586865206, "lng": -121.93116445766}
        },
        { // 42
            position: {"lat": 37.370629793522, "lng": -121.93121240406}
        },

        // GATE 6
        { // 43
            position: {"lat": 37.370667458097, "lng": -121.93125267516}
        },
        { // 44
            position: {"lat": 37.370702990517, "lng": -121.93129174124}
        },
        { // 45
            position: {"lat": 37.370738248931, "lng": -121.93133119355}
        },
        { // 46
            position: {"lat": 37.370773329814, "lng": -121.93136955218}
        },
        { // 47
            position: {"lat": 37.370806413633, "lng": -121.93140583837}
        },
        { // 48
            position: {"lat": 37.370836681469, "lng": -121.93144029443}
        },
        { // 49
            position: {"lat": 37.370865384564, "lng": -121.93147449753}
        },
        { // 50
            position: {"lat": 37.370890577208, "lng": -121.93150292729}
        },
        { // 51
            position: {"lat": 37.370916749028, "lng": -121.9315306274}
        },

        // GATE 5
        { // 52
            position: {"lat": 37.370947825792, "lng": -121.93155796092}
        },
        { // 53
            position: {"lat": 37.370978577431, "lng": -121.93159191988}
        },
        { // 54
            position: {"lat": 37.371006231364, "lng": -121.93161997203}
        },
        { // 55
            position: {"lat": 37.371033826379, "lng": -121.93164988434}
        },
        { // 56
            position: {"lat": 37.371064422895, "lng": -121.93168300076}
        },
        { // 57
            position: {"lat": 37.371093814691, "lng": -121.93171464959}
        },
        { // 58
            position: {"lat": 37.371119605253, "lng": -121.93174232858}
        },
        { // 59
            position: {"lat": 37.37114138588, "lng": -121.93177104103}
        },
        { // 60
            position: {"lat": 37.371164233846, "lng": -121.93179830536}
        },
        { // 61
            position: {"lat": 37.371191117455, "lng": -121.93182659256}
        },
        { // 62
            position: {"lat": 37.371221056547, "lng": -121.9318618656},
            heading: -68
        },

        // GATE 4
        { // 63
            position: {"lat": 37.371226637001,"lng": -121.93192633885},
            heading: -45
        },
        { // 64
            position: {"lat": 37.371259581079, "lng": -121.9319544125}
        }
    ];

    var gate3ExtendedPath = [
        // connect paths from gate 5 here
        { position: {lat: 37.37124608324751, lng: -121.93189078078211}, heading: 31 },
        { position: {lat: 37.37127892302216, lng: -121.9319263964972} }
    ];

    var gate2ExtendedPath = [
        // connect paths from gate 3 here
        { position: {lat: 37.37124608324751, lng: -121.93189078078211}, heading: 32 },
        { position: {lat: 37.37130771107147, lng: -121.93187890075552} },
        { position: {lat: 37.37133531303971, lng: -121.93184730758173} }
    ];

    var gate1ExtendedPath = [
        // connect paths from gate 6 here : 0 - 58
        { position: {"lat": 37.37118451111, "lng": -121.93173762807}, heading: 24 },
        { position: {"lat": 37.371184519818, "lng": -121.93170712416}, heading: 60 },
        { position: {"lat": 37.37118985448, "lng": -121.93163104842}, heading: 135 }
    ];

    var rawExtendedPaths = gate1ExtendedPath.concat(gate2ExtendedPath).concat(gate3ExtendedPath);

    var extendedPaths = {
        1: (paths.slice(0, 59)).concat(gate1ExtendedPath),
        2: (paths.slice(0, 63)).concat(gate2ExtendedPath),
        3: (paths.slice(0, 63)).concat(gate3ExtendedPath)
    };


    angular.module('demoApp')
        .value('AIRPORT_PATHS', paths)
        .value('RAW_EXTENDED_PATHS', rawExtendedPaths)
        .value('AIRPORT_EXTENDED_PATHS', extendedPaths)
    ;


}());