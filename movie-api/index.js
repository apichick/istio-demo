// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const _ = require('lodash');
const express = require('express');       
const app = express();              
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

const router = express.Router();              // get an instance of the express Router

router.get('/movies', function(req, res) {
    db.getMovies().then(result => {
        const items = _.map(result, item => {
            item["links"] = [
                {
                    "rel": "cast",
                    "": `/movies/${item.id}/cast`
                },
                {
                    "rel": "directors",
                    "": `/movies/${item.id}/directors`
                }
            ];
            return item;
        });
        res.json(items);   
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/movies/:id', function(req, res) {
    db.getMovie(req.params.id).then(result => {
        let item = result[0];
        item["links"] = [
            {
                "rel": "cast",
                "": `/movies/${req.params.id}/cast`
            },
            {
                "rel": "directors",
                "": `/movies/${req.params.id}/directors`
            }
        ]
        res.json(item);   
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/movies/:id/cast', function(req, res) {
    db.getMovieCast(req.params.id).then(result => {
        res.json(result);   
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/movies/:id/directors', function(req, res) {
    db.getMovieDirectors(req.params.id).then(result => {
        res.json(result);   
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);