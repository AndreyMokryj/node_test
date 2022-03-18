const appConfig = {
    rabbitUri: process.env.rabbbitUri || 'amqp://localhost',
    workQueue: process.env.workQueue || 'workQueue',
    host: process.env.host1 || '127.0.0.1',
    port: 10000,
}

export default appConfig