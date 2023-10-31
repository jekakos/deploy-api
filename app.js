const express = require('express');
const { exec } = require('child_process');
const { error } = require('console');
const { stdout } = require('process');
const app = express();

function deploy() {
    console.log(`Start deploy`);
    exec('~/deploy/deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
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