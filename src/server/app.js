const express = require("express");
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const bodyParser = require("body-parser");
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

app.post('/user/register', (req, res, next) => {
    console.log('Request URL:', req.originalUrl, req.body, req.query, req.params);
    next()
  }, 
  async(req, res) => {
    const { name, password, group, email } = req.params;
    try {
        let send = await prisma.user.create({
            data: {
                name, password, group, email
            }
        });
        res.json(send);
    } catch(e) {
        res.json(e)
    }
})

app.get('/user/login', (req, res, next) => {
    console.log('Request URL:', req.originalUrl, req.body, req.query, req.params);
    next()
  }, 
  async(req, res) => {
    const { email, password, group  } = req.body;
    let send = await prisma.user.findMany({
        where: {
            email: {
                equals: req.body.email || req.query.email
            }, 
            password: {
                equals: req.body.password || req.query.password
            }, 
            role:{
                equals: req.body.group || req.query.role
            },
        }
    });
    res.json(send);
})

app.listen(3000 || process.env.PORT)