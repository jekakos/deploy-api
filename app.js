const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
let isDeploying = false;

function deploy() {

    if (isDeploying) {
        console.log('Deploy is already running.');
        return;
    }
    isDeploying = true;
    console.log(`Start deploy`);
    exec('~/mlc/deploy/deploy.sh', (error, stdout, stderr) => {
        if (error) {
            isDeploying = false;
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        isDeploying = false;
    });
}

app.get('/test-webhook', (req, res) => {
    res.status(200).send('Received');
});

app.get('/manual-deploy', (req, res) => {
    deploy();
    res.status(200).send('Deployed');
});

app.post('/github-webhook', (req, res) => {
    console.log('github-webhook:');
    console.log(req.body);
    const branch = req.body.ref.split('/').pop();
    console.log(`Webhook with branch: ${branch}`);

    if (branch === 'main') {
        deploy();
    }
    
    res.status(200).send('Received');
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});