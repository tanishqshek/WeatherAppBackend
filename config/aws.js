const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const secretsManager = new AWS.SecretsManager();

const getSecretValue = async (secretId) => {
    try {
        const data = await secretsManager.getSecretValue({
            SecretId: secretId
        }).promise();
        if ('SecretString' in data) {
            return JSON.parse(data.SecretString);
        } else {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            return JSON.parse(buff.toString('ascii'));
        }
    } catch (err) {
        console.error('Error retrieving secret:', err);
        throw err;
    }
};

module.exports = {
    getSecretValue
};