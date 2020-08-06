/*import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';*/
var express =  require('express');
var bodyParser =  require('body-parser');
var {MongoClient} = require('mongodb');

const app = express();

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('jksportsclub')

        await operations(db);

        await client.close();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to db', error});
    }
}

app.get('/api/clubs/:initials', async (req, res) => {
    withDB(async (db) => {
        const clubInitials = req.params.initials;

        const clubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        res.status(200).json(clubInfo);
    }, res);
})

app.post('/api/clubs/:initials/upvote', async (req, res) => {
    withDB(async (db) => {
        const clubInitials = req.params.initials;

        const clubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        await db.collection('clubs').updateOne({initials: clubInitials}, {
            '$set': {
                upvotes: clubInfo.upvotes + 1,
            },
        });

        const updatedclubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        res.status(200).json(updatedclubInfo);
    }, res);
})

/*app.post('/api/clubs/:initials/upvote', (req, res) => {

    const clubInitials = req.params.initials;

    clubInfo[clubInitials].upvotes += 1;
    res.status(200).send(`${clubInfo} now has ${clubInfo[clubInitials].upvotes} upvotes!`);
});*/

app.post('/api/clubs/:initials/downvote', async (req, res) => {
    withDB(async (db) => {
        const clubInitials = req.params.initials;

        const clubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        await db.collection('clubs').updateOne({initials: clubInitials}, {
            '$set': {
                upvotes: clubInfo.upvotes - 1,
            },
        });

        const updatedclubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        res.status(200).json(updatedclubInfo);
    }, res);
})

app.post('/api/clubs/:initials/add-review', (req, res) => {
    const {username, text} = req.body;
    const clubInitials = req.params.initials;

    withDB(async (db) => {
        const clubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        await db.collection('clubs').updateOne({initials: clubInitials}, {
            '$set': {
                //reviews: {username: 1, text: 2},
                reviews: clubInfo.reviews.concat({username, text}),
                //reviews: 'test',
            },
        });

        const updatedclubInfo = await db.collection('clubs').findOne({initials: clubInitials});
        res.status(200).json(updatedclubInfo);
    }, res);
})

/*app.post('/api/clubs/:initials/add-review', (req, res) => {
    const {username, text} = req.body;
    const clubInitials = req.params.initials;

    clubInfo[clubInitials].reviews.push({username, text});
    res.status(200).send(clubInfo[clubInitials]);
});*/

app.get('/api/management', async (req, res) => {
    withDB(async (db) => {
        //const members = await db.collection('members').findOne({});
        //res.status(200).json(members);
        //await db.collection('clubs').drop();
        await db.createCollection('clubs11');
        res.status(200).send('Done');
    }, res);
})

app.post('/api/resetdb', (req, res) => { //todo: 포스트맨에서는 잘되지만 웹에서는 에러.
    withDB((db) => {
        db.collection('clubs').drop();
        db.createCollection('clubs');
        db.collection('clubs').insertMany([{
                initials:'baseball',
                upvotes: 0,
                reviews: [],
            },{
                initials:'soccer',
                upvotes: 0,
                reviews: [],
            },{
                initials:'basketball',
                upvotes: 0,
                reviews: [],
            },{
                initials:'icehockey',
                upvotes: 0,
                reviews: [],
            }]
        );

        db.collection('members').drop();
        db.createCollection("members");
        db.collection('members').insertMany([{
            name: "Harry Potter",
            registerClub: "SOCCER",
            DOB: "2001-01-09",
            city: "Calgary",
            prov: "AB",
            phone: "403-999-1234",
            email: "harry.potter@jkmail.com",
            registerDate: "2020-06-05 13:30"
        },{
            name: "Jason Bourne",
            registerClub: "BASEBALL",
            DOB: "2005-05-07",
            city: "Edmonton",
            prov: "AB",
            phone: "403-888-1234",
            email: "jason.bourne@jkmail.com",
            registerDate: "2020-05-10 10:30"
        },{
            name: "Frodo Baggins",
            registerClub: "SOCCER",
            DOB: "2003-12-21",
            city: "Vancouver",
            prov: "BC",
            phone: "403-789-9874",
            email: "frodo.baggins@jkmail.com",
            registerDate: "2020-01-19 11:30"
        },{
            name: "Gandalf",
            registerClub: "ICE HOCKEY",
            DOB: "2004-10-31",
            city: "Toronto",
            prov: "ON",
            phone: "403-963-7654",
            email: "gandalf@jkmail.com",
            registerDate: "2020-03-10 10:30"
        },{
            name: "Aragorn",
            registerClub: "BASKETBALL",
            DOB: "2006-07-20",
            city: "Calgary",
            prov: "AB",
            phone: "587-887-1234",
            email: "aragorn@jkmail.com",
            registerDate: "2020-02-01 17:45"
        },{
            name: "Legolas",
            registerClub: "SOCCER",
            DOB: "2006-06-11",
            city: "Quebec City",
            prov: "QC",
            phone: "741-991-5247",
            email: "legolas@jkmail.com",
            registerDate: "2020-03-10 04:30"
        },{
            name: "Saruman",
            registerClub: "BASEBALL",
            DOB: "2009-10-11",
            city: "Ottawa",
            prov: "ON",
            phone: "403-451-7891",
            email: "saruman@jkmail.com",
            registerDate: "2020-04-05 16:18"
        },{
            name: "Bruce Wayne",
            registerClub: "BASEBALL",
            DOB: "2009-03-04",
            city: "Montreal",
            prov: "QC",
            phone: "553-517-1137",
            email: "bruce.wayne@jkmail.com",
            registerDate: "2020-04-30 19:21"
        },{
            name: "Peter Parker",
            registerClub: "BASKETBALL",
            DOB: "2005-11-07",
            city: "Winnipeg",
            prov: "MB",
            phone: "247-651-6666",
            email: "peter.parker@jkmail.com",
            registerDate: "2020-05-10 10:30"
        }
        ]);

        res.sendStatus(200)
    }, res);
})

app.listen(8000, () => console.log('Listening on  port 8000'));