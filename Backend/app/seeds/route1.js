const db = require("../models");
const Photowalk = db.photowalks;
const Waypoint = db.waypoints;
const Challenge = db.challenges;

const seeder = {
    route1: async ()=>{
        const photowalk1 = Photowalk.build({
            name: 'Stadtpark',
            length: 2,
            region:'jhoto',
            description:'This is our first walk, uuuuuuhiiiiiii',
        });
        //warten bis photowalk erstellt ist und speichert ihn dann
        await photowalk1.save();
        console.log(photowalk1.name,photowalk1.id)
        Waypoint.bulkCreate([
            {lat: 53.59161873616372,lng: 10.031828946628028, photowalkId: photowalk1.id},
            {lat: 53.59195644673768,lng: 10.030587621385033, photowalkId: photowalk1.id},
            {lat: 53.5922221104924,lng: 10.03074705765478, photowalkId: photowalk1.id},
            {lat: 53.59245625343382,lng: 10.029813216646298, photowalkId: photowalk1.id},
            {lat: 53.592748930286014,lng: 10.028909744451083, photowalkId: photowalk1.id},
            {lat: 53.59356391206893,lng: 10.029426014276932, photowalkId: photowalk1.id},
            {lat: 53.59358642515475,lng: 10.029243801397225, photowalkId: photowalk1.id},
            {lat: 53.5940997202564,lng: 10.029600634953288, photowalkId: photowalk1.id},
            {lat: 53.594068202315825,lng: 10.029813216646298, photowalkId: photowalk1.id},
            {lat: 53.59468054666672,lng: 10.03023078782893, photowalkId: photowalk1.id},
            {lat: 53.5950497500014,lng: 10.028697162758073, photowalkId: photowalk1.id},
            {lat: 53.59494169082276,lng: 10.028431435641842, photowalkId: photowalk1.id},
            {lat: 53.5951262917524,lng: 10.028332736998664, photowalkId: photowalk1.id},
            {lat: 53.595229848018334,lng: 10.028127747509, photowalkId: photowalk1.id},
            {lat: 53.59572061121803,lng: 10.026176551255471, photowalkId: photowalk1.id},
            {lat: 53.59513979910583,lng: 10.025789348886104, photowalkId: photowalk1.id},
            {lat: 53.59502320820432,lng: 10.025691614248961, photowalkId: photowalk1.id},
            {lat: 53.5948990428634,lng: 10.025723825239677, photowalkId: photowalk1.id},
            {lat: 53.594844919395506,lng: 10.0253372933511, photowalkId: photowalk1.id},
            {lat: 53.59474303973836,lng: 10.02496686695786, photowalkId: photowalk1.id},
            {lat: 53.59481308202902,lng: 10.024140118196208, photowalkId: photowalk1.id},
            {lat: 53.59540843681146,lng: 10.0215525019421, photowalkId: photowalk1.id},
            {lat: 53.595965579409835,lng: 10.019142046136903, photowalkId: photowalk1.id},
            {lat: 53.595672682502645,lng: 10.018900463706563, photowalkId: photowalk1.id},
            {lat: 53.596032436027926,lng: 10.017381178644486, photowalkId: photowalk1.id},
            {lat: 53.596048354254734,lng: 10.01713422771566, photowalkId: photowalk1.id},
            {lat: 53.59601015050031,lng: 10.016554429882795, photowalkId: photowalk1.id},
            {lat: 53.59579366190611,lng: 10.015180094278954, photowalkId: photowalk1.id},
            {lat: 53.59568541719301,lng: 10.015088829805254, photowalkId: photowalk1.id},
            {lat: 53.595965579409835,lng: 10.013972182127132, photowalkId: photowalk1.id},
            {lat: 53.596971601147516,lng: 10.009892123303255, photowalkId: photowalk1.id},
            {lat: 53.59690474601564,lng: 10.00984917531561, photowalkId: photowalk1.id},
            {lat: 53.597041639743615,lng: 10.009188850005977, photowalkId: photowalk1.id},
            {lat: 53.596993886167944,lng: 10.00909758553228, photowalkId: photowalk1.id},
            {lat: 53.59696205042087,lng: 10.0088935825911, photowalkId: photowalk1.id},
            {lat: 53.59634761580239,lng: 10.008453365717985, photowalkId: photowalk1.id},
            {lat: 53.59595284480392,lng: 10.008195677792267, photowalkId: photowalk1.id},
            {lat: 53.595774559918056,lng: 10.008233257281427, photowalkId: photowalk1.id},
            {lat: 53.59567586617559,lng: 10.00784672539285, photowalkId: photowalk1.id},
            {lat: 53.595513498549266,lng: 10.007438719510452, photowalkId: photowalk1.id},
            {lat: 53.595255619271924,lng: 10.006832079185317, photowalkId: photowalk1.id},
            {lat: 53.59502639192622,lng: 10.006617339247208, photowalkId: photowalk1.id},
            {lat: 53.594552014719135,lng: 10.006391862312205, photowalkId: photowalk1.id},
            {lat: 53.59424478100158,lng: 10.006305966336992, photowalkId: photowalk1.id},
            {lat: 53.59402828336137,lng: 10.007425298264337, photowalkId: photowalk1.id},
            {lat: 53.59378949791288,lng: 10.008117834564684, photowalkId: photowalk1.id},
            {lat: 53.59378949791288,lng: 10.008821107861962, photowalkId: photowalk1.id},
            {lat: 53.59400599677661,lng: 10.010163232475088, photowalkId: photowalk1.id},
            {lat: 53.594095143045124,lng: 10.010796715292491, photowalkId: photowalk1.id},
            {lat: 53.59422090263981,lng: 10.011433705868695, photowalkId: photowalk1.id},
            {lat: 53.59466026233607,lng: 10.012614775528249, photowalkId: photowalk1.id},
            {lat: 53.594185881018134,lng: 10.01255035354682, photowalkId: photowalk1.id},
            {lat: 53.594001221078365,lng: 10.012620144026695, photowalkId: photowalk1.id},
            {lat: 53.59378472219013,lng: 10.012561090543711, photowalkId: photowalk1.id},
            {lat: 53.59341539799697,lng: 10.013103308887414, photowalkId: photowalk1.id},
            {lat: 53.59335490493351,lng: 10.013344891317796, photowalkId: photowalk1.id},
            {lat: 53.59338992724397,lng: 10.013430787293009, photowalkId: photowalk1.id},
            {lat: 53.592753153428525,lng: 10.014450801998988, photowalkId: photowalk1.id},
            {lat: 53.59265126872751,lng: 10.014252167556252, photowalkId: photowalk1.id},
            {lat: 53.59206224298401,lng: 10.015202391782358, photowalkId: photowalk1.id}
        ]);
        Challenge.bulkCreate([
            {
                description: 'Meine Kreise ziehen',
                lat: 53.59245625343382,
                lng: 10.029813216646298,
                photowalkId: photowalk1.id
            },
            {
                description: 'Auf der Jagt',
                lat: 53.594068202315825,
                lng: 10.029813216646298,
                photowalkId: photowalk1.id
            },
            {
                description: 'Lächeln und gemeinsam winken',
                lat: 53.5951262917524 ,
                lng: 10.028332736998664 ,
                photowalkId: photowalk1.id
            },
            {
                description: 'Nah am Wasser',
                lat: 53.59474303973836,
                lng: 10.02496686695786,
                photowalkId: photowalk1.id
            },
            {
                description: 'Endlose Freiheit',
                lat: 53.59540843681146,
                lng: 10.0215525019421,
                photowalkId: photowalk1.id
            },
            {
                description: 'Treffen bei der Halbzeit',
                lat: 53.59579366190611,
                lng: 10.015180094278954,
                photowalkId: photowalk1.id
            },
            {
                description: 'Das Runde muss ins Eckige',
                lat: 53.596971601147516,
                lng: 10.009892123303255,
                photowalkId: photowalk1.id
            },
            {
                description: 'Vierbeiner',
                lat: 53.59424478100158,
                lng: 10.006305966336992,
                photowalkId: photowalk1.id
            },
            {
                description: 'So schließt sich der Kreis',
                lat: 53.59422090263981,
                lng: 10.011433705868695,
                photowalkId: photowalk1.id
            },
            {
                description: 'Meine Kreise ziehen',
                lat: 53.59265126872751,
                lng: 10.014252167556252,
                photowalkId: photowalk1.id
            }
        ])
    }
}

module.exports = seeder;