
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const cors    = require('cors');


const app     = express();
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());


const showIndexFile = function (request, response){
    const html    = fs.readFileSync('./views/index.html', 'utf-8');
    const headers = {
        "Content-Type": "text/html"
    };
    response.writeHead(200, headers)

    response.end(html);
}

app.get('/', showIndexFile);



app.listen(3000, function(){
    console.log('listening');
});