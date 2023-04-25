const express = require("express");
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const bodyParser = require("body-parser");
const prisma = new PrismaClient();
const fs = require('fs')

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
    //const { email, password, role } = req.body; // to test with postman uncomment this line and comment the first line.

    try {
        let uGroup;
        let course = [];

        if (role == 'i') {
            uGroup = prisma.instructor;
            course = [];
        } else {
            uGroup = prisma.student;
            course = prisma.takes;
        }

        let sendVerify = await uGroup.findMany({
            where: {
                'email': {
                    equals: email
                }, 

                'password': {
                    equals: password
                }, 
            }
        });

        console.log('ss', sendVerify)

        async function getTakes() {
            console.log(role)
            return (sendVerify.length == 0 || sendVerify == undefined) ? {} : await course.findMany({
                where: {
                    student_id: {
                        equals: sendVerify[0]["id"]
                    }
                }
            })
        }

        async function getTeaches() {
            console.log(role)
            return sendVerify.length == 0 || sendVerify == undefined ? {} : await course.findMany({
                where: {
                    instrutor_id: {
                        equals: sendVerify[0]["id"]
                    }
                }
            })
        }

        let sendCourse = role != 'i' ? await getTakes() : await getTeaches();

        let sendRes = {
            'user': sendVerify,
            'course': sendCourse
        }

        let json = JSON.stringify(sendRes);

        fs.writeFile('data.json', json, (err) => {
        if (err) {
            console.error(err);
            return;
        }
            console.log('Data written to file');
        });

        res.json(sendRes);

    } catch(e) {
        console.log(e);
    }

})

app.listen(3000 || process.env.PORT)