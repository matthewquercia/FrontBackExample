
// Import our necessary packages 
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const logger = require("morgan");
const Data = require("./data");
const MongoClient = require('mongodb').MongoClient;
const Schema = mongoose.Schema;

// Create a new port to listen on (server side)
const API_PORT = 3001;
//allows our application to use express which is used for middleware routing
const app = express();
const router = express.Router();
//allows us to read and parse incoming requests to our server
app.use(bodyParser.urlencoded({ extended: false }));
//cross origin resource sharing allows use to make calls between localhost:3000 and localhost:3001
app.use(cors());
app.use(bodyParser.json());
//logger allows us to debug our app more effectively
app.use(logger("dev"));

//connect to our database
mongoose.connect('mongodb://localhost:27017/acedeals');

//checks to make sure the connection was opened successfully.. if not throw an error message
mongoose.connection.once("open", () => {
    console.log('CONNECTED TO DATABASE...');
}).on("error", (error) => {
    console.log('CONNECTION ERROR:', error);
});

//this route will get all users from the database
router.get("/getData", (req, res) => {
    console.log("DEBUGGER: GETTING ALL DATA");
    Data.find({}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

//this route will insert a new user into the database
router.post("/putData", (req, res) => {
    console.log("DEBUGGER: INSERTING NEW USER");
    Data.create({
        FirstName: req.body.fname,
        LastName: req.body.lname,
        Password: req.body.pass,
        Email: req.body.email,
        LoggedIn: req.body.logged,
        Friends: req.body.friends,
        Posts: req.body.posts
    }, (err, data) => {
        if (err)
            console.log(err);
    });
});

//this route will log the user in and check to validate the users information
router.post("/logUserIn", (req, res) => {
    Data.findOneAndUpdate({ Email: req.body.email }, { LoggedIn: true }, function (err, data) {
        if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
        else console.log("DEBUGGER: LOGGED USER IN EMAIL = " + req.body.email);
    });
});

//this route will log the user out
router.post("/logUserOut", (req, res) => {
    console.log("INSIDE LOG USER OUT ", req.body.email);
    Data.findOneAndUpdate({ Email: req.body.email }, { LoggedIn: false }, function (err, data) {
        if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
        else console.log("DEBUGGER: LOGGED USER OUT EMAIL = " + req.body.email);
    });
});

//this route is purely for prototyping purposes
router.post("/resetLoggedIn", (req, res) => {
    Data.updateMany({}, { LoggedIn: false }, (err, data) => {
        if (err) throw err;
        console.log("RESET ALL VALUES");
    });
});

//adds a post to the users document in the user cluster so that it can be shared with friends 
router.post("/addPost", (req, res) => {
    console.log(req.body.post);
    Data.find({}, (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            return;
        }
        data.forEach(function (user) {
            if (user.LoggedIn === true) {
                req.body.post.first = user.FirstName;
                req.body.post.last = user.LastName;
                Data.findOneAndUpdate({ Email: user.Email }, { $push: { Posts: req.body.post } }, function (err, data) {
                    if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
                    else console.log("DEBUGGER: UPDATED ");
                });
            }
        });
    });
});

//this route is used purely for prototyping 
router.post("/resetPosts", (req, res) => {
    Data.updateMany({}, { $set: { Posts: [] } }, function (err, data) {
        if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
        else console.log("DEBUGGER: UPDATE WALL POSTS WITH ");
    });
});

//this route is used to add a friend to the document and user cluster
router.post("/addFriend", (req, res) => {
    let obj = {};
    obj.FirstName = req.body.first;
    obj.LastName = req.body.last;
    obj.Email = req.body.email;
    console.log(obj);
    Data.find({}, (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            return;
        }
        data.forEach(function (user) {
            if (user.LoggedIn === true) {
                Data.findOneAndUpdate({ Email: user.Email }, { $push: { Friends: obj } }, function (err, data) {
                    if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
                    else console.log("DEBUGGER: UPDATED ");
                });
            }
        });
    });
});

//this route will be used to remove a friend from the document and user cluster for user that is logged in
router.post("/removeFriend", (req, res) => {
    Data.find({}, (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            return;
        }
        data.forEach(function (user) {
            if (user.LoggedIn === true) {
                user.Friends.forEach(e => {
                    if (e.Email === req.body.email) {
                        Data.findOneAndUpdate({ Email: user.Email }, { $pull: { Friends: e } }, function (err, data) {
                            if (err) console.log("THE RECORD WAS NOT UPDATED! " + err);
                            else console.log("DEBUGGER: UPDATE");
                        });
                    }
                });
            }
        });
    });
});

//This was a probem that we could not fix as we are only recieving one post from a friend instead of all the posts 
//from all the friends
router.get("/getFriendPosts", (req, res) => {
    var allFriendPosts = [];
    Data.find({}, (err, data) => {
        if (err) {
            console.log("ERROR " + err);
            return;
        }
        data.forEach(function (user) {
            if (user.LoggedIn === true) {
                user.Friends.forEach(f => {
                    Data.find({ Email: f.Email }, (err, data) => {
                        if (err) return err;
                        data.forEach(f => {
                            f.Posts.forEach(p => {
                                allFriendPosts.push(p);
                            });
                        });
                    });
                });
            }
        });
        return res.json({ success: true, data: allFriendPosts });
    });
});

//*****THIS WAS SUPPOSED TO BE THE CLOUD CONNECTION***** */

// const uri = "mongodb+srv://root:Seneca_101@cluster0-h93gz.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//     console.log('CONNECTED TO DATABASE...');
//     const collection = client.db("test").collection("devices");

//     router.get("/getData", (req, res) => {
//         collection.find({ _id: '1' }, (err, data) => {
//             if (err) return res.json({ success: false, error: err });
//             return res.json({ success: true, data: data });
//         });
//     });

//     client.close();
// });


//sets up the PORT number to 3001 and allows the app to use the /api router
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
app.use("/api", router);