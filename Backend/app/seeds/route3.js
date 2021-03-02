const db = require("../models");
const Photowalk = db.photowalks;
const Waypoint = db.waypoints;
const Challenge = db.challenges;

const seeder = {
    route3: async ()=>{
        const photowalk3 = Photowalk.build({
            name: 'Alsterlauf',
            length: .5,
            region:'Innenstadt',
            route:'',
            description:'Alles dreht sich um die Alster',
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
        ])
    }
}

module.exports = seeder;