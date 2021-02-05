const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars and view location
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// Setup static directory to serve 
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Franco Bianco'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Franco Bianco'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Franco Bianco',
        text: 'This is a helpful page.'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Article Not Found',
        errorMsg: 'Article not found.',
        name: 'Franco Bianco'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not Found',
        errorMsg: 'Page not found.',
        name: 'Franco Bianco'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});