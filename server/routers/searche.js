const express = require('express');

const app = express();


//Catches requests made to localhost:3000/search
app.get('/search', (request, response) => {

    //Holds value of the query param 'searchquery'.
    const searchQuery = request.query.searchquery;

    //Do something when the searchQuery is not null.
    if (searchQuery != null) {

        searchGoogle(searchQuery)
            .then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }
});
