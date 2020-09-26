
//CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');



const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//MongoDB will create database automatically if we connect to MongoClient 
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('unable to connect to database');
    }
    const db = client.db(databaseName);

    //READ
    db.collection('users').findOne({ _id: new ObjectID('5f6de7a5c3b3450938fd8389') }, (error, result) => {
        if (error) {
            return console.log('unable to fetch data');
        }
        console.log(result);

    })

    db.collection('users').find({ age: 24 }).toArray((error, result) => {
        if (error) {
            return console.log('unable to fetch multiple rows');
        }
        console.log(result);
    })
    db.collection('users').find({ age: 24 }).count((error, result) => {
        if (error) {
            return console.log('unable to count the records');
        }
        console.log(result);
    })
    db.collection('tasks').findOne({ _id: new ObjectID('5f6de1421c4cb50916785a03') }, (error, result) => {
        if (error) {
            return console.log('unable to fetch data');
        }
        console.log(result);

    })
    db.collection('tasks').find({ completed: true }).toArray((error, result) => {
        if (error) {
            return console.log('unable to fetch multiple rows');
        }
        console.log(result);
    })

    //UPDATE
    db.collection('users').updateOne(
        { _id: new ObjectID('5f6dd97be41f2808d067ade4') },
        {
            $inc: {
                age: 2
            }
        }).then((result) => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })

    db.collection('tasks').updateMany(
        { completed: false },
        {
            $set: {
                completed: true
            }
        }).then((result) => {
            console.log(result.matchedCount);
        }).catch(error => {
            console.log(error);
        })

    //DELETE
    db.collection('users').deleteOne(
        { _id: new ObjectID('5f6de0ccd8e40e091154a0f6') }
    ).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error);
    })

    db.collection('users').deleteMany(
        { completed: true },
    ).then((result) => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
})