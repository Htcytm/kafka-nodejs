const { CronJob } = require('cron');
const axios = require('axios').default;
const dotenv = require('dotenv');
const { dotEnvOptions } = require('../config/dotenv-options');
const { Producer } = require('../services/producer-service');
const { mapKafkaMessage } = require('./helper');
const logger = require("./logger");

dotenv.config(dotEnvOptions);

const producerJob = new CronJob('* * * * *', async () => {
    try {
        const response = await axios.get(process.env.RATES_URL);
        const producer = new Producer();
        producer.sendMessage(mapKafkaMessage(response.data));
    } catch (error) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}); 

module.exports = { producerJob };