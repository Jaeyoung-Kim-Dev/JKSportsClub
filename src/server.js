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

app.post('/api/resetdb', async (req, res) => { //todo: 포스트맨에서는 잘되지만 웹에서는 에러.
    withDB(async (db) => {
        await db.collection('clubs').drop();
        db.createCollection('clubs');
        db.collection('clubs').insert([{
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
        )

        await db.collection('members').drop();
        db.createCollection("members");
        db.collection('members').insert([{
            custName: "Harry Potter",
            custEmail: "harry.potter@jkmail.com",
            custPhone: "403-999-1234",
            numberAdults: 2,
            numberChild: 2,
            createDate: "2020-06-05 13:30",
            firstDate: "2020-08-01",
            lastDate: "2020-08-10"
        },{
            custName: "Jason Bourne",
            custEmail: "jason.bourne@jkmail.com",
            custPhone: "403-888-1234",
            numberAdults: "1",
            numberChild: "0",
            createDate: "2020-05-10 10:30",
            firstDate: "2020-06-01",
            lastDate: "2020-06-15"
        },{
            custName: "Frodo Baggins",
            custEmail: "frodo.baggins@jkmail.com",
            custPhone: "403-789-9874",
            numberAdults: "3",
            numberChild: "7",
            createDate: "2020-01-19 11:30",
            firstDate: "2020-06-30",
            lastDate: "2020-07-15"
        },{
            custName: "Gandalf",
            custEmail: "gandalf@jkmail.com",
            custPhone: "403-963-7654",
            numberAdults: "2",
            numberChild: "2",
            createDate: "2020-03-10 10:30",
            firstDate: "2020-12-01",
            lastDate: "2020-12-26"
        },{
            custName: "Aragorn",
            custEmail: "aragorn@jkmail.com",
            custPhone: "587-887-1234",
            numberAdults: "2",
            numberChild: "10",
            createDate: "2020-02-01 17:45",
            firstDate: "2020-08-17",
            lastDate: "2020-08-20"
        },{
            custName: "Legolas",
            custEmail: "legolas@jkmail.com",
            custPhone: "741-991-5247",
            numberAdults: "2",
            numberChild: "9",
            createDate: "2020-03-10 04:30",
            firstDate: "2020-09-14",
            lastDate: "2020-09-15"
        },{
            custName: "Saruman",
            custEmail: "saruman@jkmail.com",
            custPhone: "403-451-7891",
            numberAdults: "2",
            numberChild: "5",
            createDate: "2020-04-05 16:18",
            firstDate: "2020-10-02",
            lastDate: "2020-11-15"
        },{
            custName: "Bruce Wayne",
            custEmail: "bruce.wayne@jkmail.com",
            custPhone: "553-517-1137",
            numberAdults: "2",
            numberChild: "1",
            createDate: "2020-04-30 19:21",
            firstDate: "2020-08-29",
            lastDate: "2020-09-10"
        },{
            custName: "Peter Parker",
            custEmail: "peter.parker@jkmail.com",
            custPhone: "247-651-6666",
            numberAdults: "1",
            numberChild: "0",
            createDate: "2020-05-10 10:30",
            firstDate: "2020-06-01",
            lastDate: "2020-06-15"
        }
        ]);

        res.sendStatus(200)
    }, res);
})

app.listen(8000, () => console.log('Listening on  port 8000'));