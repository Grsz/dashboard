const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { db } = require('./db');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const homePage = "http://localhost:3000/";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.post('/signin', (req, res) => {
    const { password, username } = req.body;
    db('users').where('username', username)
        .select('hash')
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid){
                return db.select('*').from('users').where({username})
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json('unable to get user'))
            } else {res.status(400).json('wrong data')}
        })
    .catch(err => res.status(400).json('wrong data'))
})
app.post('/register', (req, res) => {
    const {email, name, password, passwordConfirm} = req.body;
    const { profimg } = req.files;
    if(password === passwordConfirm){
        const hash = bcrypt.hashSync(password);
        if(profimg !== 'null'){
            console.log(profimg)
            const dir = '../public/images/' + email + "/";
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            profimg.mv(dir + profimg.name, err => {
                if(err){console.log(err)}
            });
        }
        db('users')
        .insert({
            email,
            hash,
            username: name,
            profimg: profimg ? profimg.name : null
        })
        .returning('*')
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to register'))
    } else {
        res.status(400).json("Passwords aren't matching")
    }
})
app.listen(3001, () => {
    console.log('app is running on port 3001')
})