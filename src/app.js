const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const dotenv = require('dotenv');

const { producerJob } = require("./utils/cronjob");
const { corsOptions } = require("./config/cors-config");
const { dotEnvOptions } = require('./config/dotenv-options');
const logger = require("./utils/logger");

const app = express();

const port = process.env.REST_API_PORT || 3000;

dotenv.config(dotEnvOptions);

app.use(cors({ ...corsOptions }));
app.use(helmet());

app.get('/api/v1/ping', (req, res) => {
    res.json("PONG")
});

app.post('/api/v1/job/start', (req, res) => {
    logger.debug("Cronjob is just started. It will run in every minute");
    producerJob.start();
    res.send({
        message: "Cronjob Started"
    });
} 
);

app.post('/api/v1/job/stop', (req, res) => {
    logger.debug("Cronjob is just stopped.");
    producerJob.stop();
    res.send({
        message: "Cronjob stoped"
    });
});

app.listen( port , () => {
    logger.debug(`Application running on port ${process.env.REST_API_PORT}`)
});