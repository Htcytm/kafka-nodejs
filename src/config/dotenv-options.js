const path = require('path');

const env = process.env.NODE_ENV || "dev";
const p = path.join(process.cwd(), `env/.env.${env}`);

exports.dotEnvOptions = {
    path: p
};

