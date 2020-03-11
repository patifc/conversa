
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const cors    = require('cors');


const app     = express();
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());


const showIndexFile = function (request, response){
    const html    = fs.readFileSync('./views/home.html', 'utf-8');
    const headers = {
        "Content-Type": "text/html"
    };
    response.writeHead(200, headers)

    response.end(html);
}

app.get('/', showIndexFile);

// SHOWS THE USER PAGE
app.get("./views/:id", function(req, res){
    //find the user with provided ID
    //render show template with that user
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");

})



app.listen(3000, function(){
    console.log('listening');
});