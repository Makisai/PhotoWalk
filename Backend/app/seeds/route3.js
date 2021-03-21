const db = require("../models");
const Photowalk = db.photowalks;
const Waypoint = db.waypoints;
const Challenge = db.challenges;

const seeder = {
    route3: async ()=>{
        const photowalk3 = Photowalk.build({
            name: 'Alster Rundfahrt',
            length: 30,
            region:'Binnenalster',
            description:'Dieser kurze PhotoWalk führt Dich einmal um die Binnenalster in der Hamburger Innenstadt. ' +
                'Die Binnenalster hat eine Fläche von etwa 18 Hektar und ist der kleinere, südliche Teil des Alstersees. ' +
                'Die weißen Fassaden und kupfergedeckten Dächer der Gebäude, bieten Dir ein ganz besonderes Panorama. ' +
                'Besonders in den frühen Abendstunden kannst Du hier ein paar einzigartige Aufnahmen machen. ' +
                'Das Areal an der Hamburger Binnenalster wird nicht ohne Grund auch die »Gute Stube Hamburgs« genannt. ' +
                'Gehe doch vielleicht einmal zu verschiedenen Tageszeiten auf diesen PhotoWalk und schaue, wie Du die ' +
                'Challenges auf unterschiedliche Arten lösen kannst. ' +
                'Dieser PhotoWalk führt Dich außerdem direkt zum Eingang von Planten un Blomen, falls Du Deinen ' +
                'Spaziergang in Hamburgs bekanntester Parkanlage fortsetzen möchtest.',
        });
//warten bis photowalk erstellt ist und speichert ihn dann
        await photowalk3.save();
        console.log(photowalk3.name,photowalk3.id)
        Waypoint.bulkCreate([
            {lat: 53.558545213395725, lng: 9.98855943697767, photowalkId: photowalk3.id},
            {lat: 53.55843505306381, lng: 9.989592429321414, photowalkId: photowalk3.id},
            {lat: 53.557633874155385, lng: 9.989984819659835, photowalkId: photowalk3.id},
            {lat: 53.556577751591995, lng: 9.990315896572561, photowalkId: photowalk3.id},
            {lat: 53.554880615875035, lng: 9.990806383022136, photowalkId: photowalk3.id},
            {lat: 53.554337953598285, lng: 9.991223213057346, photowalkId: photowalk3.id},
            {lat: 53.55259611146321, lng: 9.993946816102161, photowalkId: photowalk3.id},
            {lat: 53.55216906148847, lng: 9.994619678527298, photowalkId: photowalk3.id},
            {lat: 53.55325989593021, lng: 9.996740929511285, photowalkId: photowalk3.id},
            {lat: 53.554427183541215, lng: 9.998636841773989, photowalkId: photowalk3.id},
            {lat: 53.555537079186664, lng: 10.000212495798804, photowalkId: photowalk3.id},
            {lat: 53.55582843300704, lng: 9.999820072296348, photowalkId: photowalk3.id},
            {lat: 53.55621447398867, lng: 9.998391535685466, photowalkId: photowalk3.id},
            {lat: 53.556547705128885, lng: 9.99811112880707, photowalkId: photowalk3.id},
            {lat: 53.556944665095465, lng: 9.996759295463564, photowalkId: photowalk3.id},
            {lat: 53.557295188210105, lng: 9.994872531048339, photowalkId: photowalk3.id},
            {lat: 53.55729154808957, lng: 9.993315239976322, photowalkId: photowalk3.id},

        ]);
        Challenge.bulkCreate([
            {
                description: 'Planten un Blomen',
                lat: 53.558545213395725,
                lng: 9.98855943697767,
                photowalkId: photowalk3.id
            },
            {
                description: 'Lieb und Teuer',
                lat: 53.55567000961159,
                lng: 9.990536541839258,
                photowalkId: photowalk3.id
            },
            {
                description: 'Etwas das mit "fa" beginnt',
                lat: 53.55275090389172,
                lng: 9.993540644645693,
                photowalkId: photowalk3.id
            },
            {
                description: 'Traditionell',
                lat: 53.553643228321086,
                lng: 9.997403025627136,
                photowalkId: photowalk3.id
            },
            {
                description: 'Hamburger Linie',
                lat: 53.556893679613424,
                lng: 9.997317214625353,
                photowalkId: photowalk3.id
            },
            {
                description: 'Die grüne Stadt',
                lat: 53.55729154808957,
                lng: 9.993315239976322,
                photowalkId: photowalk3.id
            }
        ])
    }
}

module.exports = seeder;