import start from './publisher'

process.env.NODE_ENV = 'development'

const express = require('express'),
    app = express(),
    fs = require('fs')

const host = '127.0.0.1'
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let file = 'data.json'

if ((process.env.NODE_ENV = 'test')) file = 'data-test.json'

// app.use((req, res, next) => {
//     fs.readFile(file, (err, data) => {
//         if (err)
//             return res
//                 .status(500)
//                 .send({ message: 'Error while getting users' })
//
//         req.users = JSON.parse(data)
//
//         next()
//     })
// })

app
    .route('/api/image')
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