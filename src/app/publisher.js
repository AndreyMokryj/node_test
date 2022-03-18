import amqp from 'amqplib'
import config from '../config.js'


const assertQueueOptions = { durable: true }
const sendToQueueOptions = { persistent: true }
const { rabbitUri, workQueue } = config


const assertAndSendToQueue = (channel, data) => {
    const bufferedData = Buffer.from(data ? data : "")

    return channel.assertQueue(workQueue, assertQueueOptions)
        .then(() => channel.sendToQueue(workQueue, bufferedData, sendToQueueOptions))
        .then(() => channel.close())
}

const sendUrlToQueue = (url) => amqp.connect(rabbitUri)
    .then(connection => connection.createChannel())
    .then(channel => assertAndSendToQueue(channel, url))

export const start = (url) => sendUrlToQueue(url)
    .tap(() => console.log('The file url has been sent to queue'))