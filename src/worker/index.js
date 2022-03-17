import amqp from 'amqplib'
import { resolve } from 'bluebird'
import config from '../config'

const assertQueueOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const { uri, workQueue } = config
const tesseract = require("node-tesseract-ocr")

const tesseractConfig = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

const processHeavyTask = msg => resolve(tesseract
    .recognize(msg.content.toString(), tesseractConfig)
    .then((text) => {
        console.log("Result:", text)
    })
    .catch((error) => {
        console.log(error.message)
    }))

const assertAndConsumeQueue = (channel) => {
    console.log('Worker is running! Waiting for new messages...')

    const ackMsg = (msg) => resolve(msg)
        .tap(msg => processHeavyTask(msg))
        .then((msg) => channel.ack(msg))

    return channel.assertQueue(workQueue, assertQueueOptions)
        .then(() => channel.prefetch(1))
        .then(() => channel.consume(workQueue, ackMsg, consumeQueueOptions))
}

const listenToQueue = () => amqp.connect(uri)
    .then(connection => connection.createChannel())
    .then(channel => assertAndConsumeQueue(channel))


export default listenToQueue()