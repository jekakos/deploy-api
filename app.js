const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/test-webhook', (req, res) => {
    res.status(200).send('Received');
});

app.post('/github-webhook', (req, res) => {
    exec('./deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
    
    res.status(200).send('Received');
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});