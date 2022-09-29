const Log = require('../models/log');

module.exports = {
    createLike,
    deleteLike
}

async function createLike(req, res) {
    try {
        console.log(req.params,'<-this is req.params from createLike function');
        const log = await Log.findById(req.params.id);
        log.likes.push({ username: req.user.username, userId: req.user._id });
        await log.save()// save it
        res.status(201).json({ data: 'like added' })
    } catch (err) {
        res.status(400).json({ error: err })
    }

}

async function deleteLike(req, res) {
    try {
        console.log(req.params,'<-this is req.params from deleteLike function');
        const log = await Log.findOne({ 'likes._id': req.params.id, 'likes.username': req.user.username });
        log.likes.remove(req.params.id) 
        // req.params.id is the like id 
        await log.save() 
        res.json({ data: 'like removed' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}