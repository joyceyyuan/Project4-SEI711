const Log = require("../models/log");

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
const { v4: uuidv4 } = require("uuid");
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

module.exports = {
    create,
    index,
    deleteLog
};

function create(req, res) {
    console.log(req.body, req.file, req.user,'<-req.body, req.file, req.user from create log controller');
    const key = `travelog/logs/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

    s3.upload(params, async function (err, data) {
        console.log("=======================");
        console.log(err, " err from aws");
        console.log("=======================");
        if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
        try {
            // Using our model to create a document in the logs collection in mongodb
            const log = await Log.create({
                location: req.body.location,
                title: req.body.title,
                text: req.body.text,
                user: req.user,
                photoUrl: data.Location, // < this is from aws
            });
            // respond to the client!
            res.status(201).json({ data: log });
        } catch (err) {
            res.status(400).json({ err });
        }
    });
}

async function index(req, res) {
    try {
        // this populates the user when you find the logs
        // so you'll have access to the users information
        // when you fetch the logs
        const logs = await Log.find({}).populate("user").exec();
        res.status(200).json({ data: logs });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteLog(req, res) {
    try {
        await Log.findByIdAndDelete(req.params.id);
        res.json({ data: 'log removed' })
    } catch (err) {
        res.status(400).json({ err });
    }
}