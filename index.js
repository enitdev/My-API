const express = require('express');
const app = express();
const router = require('./router');
const port = 3005;

app.use(express.json() );
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});