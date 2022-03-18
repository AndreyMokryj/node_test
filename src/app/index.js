import {start} from './publisher.js'

process.env.NODE_ENV = 'development'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express'),
    app = express(),
    fs = require('fs')

const host = '0.0.0.0'
const port = 10000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let file = 'data.json'

if ((process.env.NODE_ENV = 'test')) file = 'data-test.json'

app
    .route('/api/image')
    .get((req, res) => {
        return res
            .status(200)
            .send({ message: 'I am alive!' });
    })
    .post((req, res) => {
        if (req.body.fileUrl) {
            const fileUrl = req.body.fileUrl;
            console.log(fileUrl);
            start(fileUrl);

            return res
                .status(200)
                .send({ message: 'File url has been sent to queue.' });
        } else
            return res
                .status(400)
                .send({ message: 'Bad request.' })
    })

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)