const db = require("../models");
const Photowalk = db.photowalks;
const Waypoint = db.waypoints;
const Challenge = db.challenges;

const seeder = {
    route2: async ()=>{
        const photowalk2 = Photowalk.build({
            name: 'Hafencity',
            length: 1,
            region:'Hafencity',
            route:'',
            description:'This is our second walk',
        });
//warten bis photowalk erstellt ist und speichert ihn dann
        await photowalk2.save();
        console.log(photowalk2.name,photowalk2.id)
        Waypoint.bulkCreate([
            {lat: 53.53521336640151, lng: 10.024162351676146, photowalkId: photowalk2.id},
            {lat: 53.53538689692047, lng: 10.023538075184806, photowalkId: photowalk2.id},
            {lat: 53.535104055808205, lng: 10.023295920352979, photowalkId: photowalk2.id},
            {lat: 53.53540283796496, lng: 10.02283609061625, photowalkId: photowalk2.id},
            {lat: 53.53582550209965, lng: 10.022210721768303, photowalkId: photowalk2.id},
            {lat: 53.53550121690164, lng: 10.021855119681728, photowalkId: photowalk2.id},
            {lat: 53.53549757315492, lng: 10.021438206788996, photowalkId: photowalk2.id},
            {lat: 53.53595302855836, lng: 10.019488526688274, photowalkId: photowalk2.id},
            {lat: 53.536430340678734, lng: 10.017394764588577, photowalkId: photowalk2.id},
            {lat: 53.53680562811529, lng: 10.017174045882744, photowalkId: photowalk2.id},
            {lat: 53.5370643191351, lng: 10.01619307494822, photowalkId: photowalk2.id},
            {lat: 53.53746510541919, lng: 10.01637087550034, photowalkId: photowalk2.id},
            {lat: 53.53751975768537, lng: 10.016076586184584, photowalkId: photowalk2.id},
            {lat: 53.53795333012883, lng: 10.015917178939821, photowalkId: photowalk2.id},
            {lat: 53.538292169796115, lng: 10.014789061219103, photowalkId: photowalk2.id},
            {lat: 53.53820472749817, lng: 10.014580604609009, photowalkId: photowalk2.id},
            {lat: 53.53848527033009, lng: 10.014353754691557, photowalkId: photowalk2.id},
            {lat: 53.53854720883263, lng: 10.013660945135554, photowalkId: photowalk2.id},
            {lat: 53.53921030243702, lng: 10.013526061099972, photowalkId: photowalk2.id},
            {lat: 53.53937425265471, lng: 10.012483779686715, photowalkId: photowalk2.id},
            {lat: 53.53956734903155, lng: 10.011233041008449, photowalkId: photowalk2.id},
            {lat: 53.53978594720737, lng: 10.009412112422012, photowalkId: photowalk2.id},
            {lat: 53.53992074827594, lng: 10.007897737866497, photowalkId: photowalk2.id},
            {lat: 53.5399535383648, lng: 10.007045518118806, photowalkId: photowalk2.id},
            {lat: 53.53999725753579, lng: 10.006095202914837, photowalkId: photowalk2.id},
            {lat: 53.53989888885115, lng: 10.004090343219499, photowalkId: photowalk2.id},
            {lat: 53.53988067200664, lng: 10.003323959124351, photowalkId: photowalk2.id},
            {lat: 53.5400519059496, lng: 10.00326877952978, photowalkId: photowalk2.id},
            {lat: 53.54016849100719, lng: 10.002986749690296, photowalkId: photowalk2.id},
            {lat: 53.54076598115354, lng: 10.002778292752785, photowalkId: photowalk2.id},
            {lat: 53.540893493072126, lng: 10.001791189624347, photowalkId: photowalk2.id},
            {lat: 53.54102100446074, lng: 10.000151127032094, photowalkId: photowalk2.id},
            {lat: 53.5411485158544, lng: 9.999948801633579, photowalkId: photowalk2.id},
            {lat: 53.54143632584618, lng: 9.999783262194903, photowalkId: photowalk2.id},
            {lat: 53.54202651507546, lng: 9.999349145340357, photowalkId: photowalk2.id},
            {lat: 53.542412682170024, lng: 9.999110032999711, photowalkId: photowalk2.id},
            {lat: 53.5429627818676, lng: 9.998693119779565, photowalkId: photowalk2.id},
            {lat: 53.54355704591298, lng: 9.998355203363595, photowalkId: photowalk2.id},
            {lat: 53.54404884406306, lng: 9.99803025700757, photowalkId: photowalk2.id},
            {lat: 53.54436213523159, lng: 9.997785013455346, photowalkId: photowalk2.id},
            {lat: 53.54477742432356, lng: 9.997533640001295, photowalkId: photowalk2.id},
            {lat: 53.54432934962751, lng: 9.995970216407907, photowalkId: photowalk2.id},
            {lat: 53.544376707262366, lng: 9.995737235606336, photowalkId: photowalk2.id},
            {lat: 53.544266964332294, lng: 9.994327088046134, photowalkId: photowalk2.id},
            {lat: 53.54413946233193, lng: 9.992733010031985, photowalkId: photowalk2.id},
            {lat: 53.5441030326737, lng: 9.991580369102042, photowalkId: photowalk2.id},
            {lat: 53.54413627366942, lng: 9.990738499881788, photowalkId: photowalk2.id},
            {lat: 53.54404155878147, lng:  9.989861756597454, photowalkId: photowalk2.id},
            {lat: 53.543809320936845, lng: 9.987011315299219, photowalkId: photowalk2.id},
            {lat: 53.54270913697906, lng: 9.987109411410373, photowalkId: photowalk2.id},
            {lat: 53.54259984499564, lng: 9.985221041461003, photowalkId: photowalk2.id},
            {lat: 53.54235940280628, lng: 9.985122943385221, photowalkId: photowalk2.id},
            {lat: 53.54126555712643, lng: 9.985268716352996, photowalkId: photowalk2.id},


        ]);
        Challenge.bulkCreate([
            {
                description: 'Ohrenschmaus',
                lat: 53.54126555712643,
                lng: 9.985268716352996,
                photowalkId: photowalk2.id
            },
        ])
    }
}

module.exports = seeder;