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
        const db = client.db('jkhotel')

        await operations(db);

        await client.close();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to db', error});
    }
}

app.get('/api/hotels/:initials', async (req, res) => {
    withDB(async (db) => {
        const hotelInitials = req.params.initials;

        const hotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        res.status(200).json(hotelInfo);
    }, res);
})

app.post('/api/hotels/:initials/upvote', async (req, res) => {
    withDB(async (db) => {
        const hotelInitials = req.params.initials;

        const hotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        await db.collection('hotels').updateOne({initials: hotelInitials}, {
            '$set': {
                upvotes: hotelInfo.upvotes + 1,
            },
        });

        const updatedHotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        res.status(200).json(updatedHotelInfo);
    }, res);
})

/*app.post('/api/hotels/:initials/upvote', (req, res) => {

    const hotelInitials = req.params.initials;

    hotelInfo[hotelInitials].upvotes += 1;
    res.status(200).send(`${hotelInfo} now has ${hotelInfo[hotelInitials].upvotes} upvotes!`);
});*/

app.post('/api/hotels/:initials/downvote', async (req, res) => {
    withDB(async (db) => {
        const hotelInitials = req.params.initials;

        const hotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        await db.collection('hotels').updateOne({initials: hotelInitials}, {
            '$set': {
                upvotes: hotelInfo.upvotes - 1,
            },
        });

        const updatedHotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        res.status(200).json(updatedHotelInfo);
    }, res);
})

app.post('/api/hotels/:initials/add-review', (req, res) => {
    const {username, text} = req.body;
    const hotelInitials = req.params.initials;

    withDB(async (db) => {
        const hotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        await db.collection('hotels').updateOne({initials: hotelInitials}, {
            '$set': {
                //reviews: {username: 1, text: 2},
                reviews: hotelInfo.reviews.concat({username, text}),
                //reviews: 'test',
            },
        });

        const updatedHotelInfo = await db.collection('hotels').findOne({initials: hotelInitials});
        res.status(200).json(updatedHotelInfo);
    }, res);
})

/*app.post('/api/hotels/:initials/add-review', (req, res) => {
    const {username, text} = req.body;
    const hotelInitials = req.params.initials;

    hotelInfo[hotelInitials].reviews.push({username, text});
    res.status(200).send(hotelInfo[hotelInitials]);
});*/

app.get('/api/management', async (req, res) => {
    withDB(async (db) => {
        //const bookings = await db.collection('bookings').findOne({});
        //res.status(200).json(bookings);
        //await db.collection('hotels').drop();
        await db.createCollection('hotels11');
        res.status(200).send('Done');
    }, res);
})

app.post('/api/resetdb', async (req, res) => { //todo: 포스트맨에서는 잘되지만 웹에서는 에러.
    withDB(async (db) => {
        await db.collection('hotels').drop();
        db.createCollection('hotels');
        db.collection('hotels').insert([{
                initials:'bw',
                upvotes: 0,
                reviews: [],
            },{
                initials:'rpc',
                upvotes: 0,
                reviews: [],
            },{
                initials:'spis',
                upvotes: 0,
                reviews: [],
            }]
        )

        await db.collection('bookings').drop();
        db.createCollection("bookings");
        db.collection('bookings').insert([{
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