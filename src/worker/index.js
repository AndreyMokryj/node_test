import amqp from 'amqplib'
import pkg from 'bluebird';
const { resolve } = pkg;
import config from '../config.js'

const assertQueueOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const { rabbitUri, workQueue } = config

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tesseract = require("node-tesseract-ocr")

const tesseractConfig = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

const processHeavyTask = async msg => {
    const result = await (recognizeFromFileUrl(msg.content.toString()))
    console.log('processHeavyTask returned result: ' + result)
}

const assertAndConsumeQueue = (channel) => {
    console.log('Worker is running! Waiting for new messages...')

    const ackMsg = (msg) => resolve(msg)
        .tap(msg => processHeavyTask(msg))
        .then((msg) => channel.ack(msg))

    return channel.assertQueue(workQueue, assertQueueOptions)
        .then(() => channel.prefetch(1))
        .then(() => channel.consume(workQueue, ackMsg, consumeQueueOptions))
}

const listenToQueue = () => amqp.connect(rabbitUri)
    .then(connection => connection.createChannel())
    .then(channel => assertAndConsumeQueue(channel))


export default listenToQueue()

export async function recognizeFromFileUrl(url) {
    return tesseract.recognize(url, tesseractConfig)
        .then(text => {
            console.log('Result: \n' + text)
            return text
        })
        .catch((error) => {
            console.log(error.message)
            return undefined
        })
}
