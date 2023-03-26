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
    console.log('Request URL:', req.originalUrl, req.body);
    next()
  }, 

  async(req, res) => {
    const { name, password, role, email } = req.body.params;
   
    try {
        let uGroup = (role == 'i') ? prisma.instructor : prisma.student;

        let send = await uGroup.create({
            data: {
                name, password, email
            }
        });

        res.json(send);
    } catch(e) {
        res.json(e);
    }
})

app.get('/user/login', (req, res, next) => {
    console.log('Request URL:', req.originalUrl, req.query, req.body);
    next()
  }, 

  async(req, res) => {
    const { email, password, role } = req.query;
    //const { email, password, role } = req.body;

    try {
        let uGroup = (role == 'i') ? prisma.instructor : prisma.student;
    
        let send = await uGroup.findMany({
            where: {
                email: {
                    equals: email
                }, 
                password: {
                    equals: password
                }, 
            }
        });

        res.json(send);
    } catch(e) {
        console.log(e);
    }

})

app.listen(3000 || process.env.PORT)