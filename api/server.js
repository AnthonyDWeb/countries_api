const express = require("express");
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');
app.use(cors());

dotenv.config("./config.env")

const countriesData = require("./countriesData.json");
app.get('/all', (req, res) => {
    let countries = countriesData.map((country) => ({ 
        name: country.name, capital: country.capital, region: country.region, currencie: country.currencies[0].name 
    }))
    res.json(countries);
})


app.get('/country/:countryName', (req, res) => {
    const countryName = req.params.countryName.toLowerCase();

    // On filtre les données pour récupérer juste le pays qui nous intéresse
    const countryDataName = countriesData.filter(
        (country) => country.name.toLowerCase() === countryName 
    );

    res.json([{name: countryDataName[0].name, capital: countryDataName[0].capital, region: countryDataName[0].region, currencie: countryDataName[0].currencies[0].name, flag: countryDataName[0].flag}]);
});




app.get('/capital/:countryCapital', (req, res) => {
    const countryCapital = req.params.countryCapital.toLowerCase();

    // On filtre les données pour récupérer juste la capital qui nous intéresse
    const countryDataCapital = countriesData.filter(
        (country) => country.capital.toLowerCase() === countryCapital);

    res.json([{name: countryDataCapital[0].name, capital: countryDataCapital[0].capital, region: countryDataCapital[0].region, currencie: countryDataCapital[0].currencies[0].name}]);
  
});


app.get('/region/:countryRegion', (req, res) => {
    const countryRegion = req.params.countryRegion.toLowerCase();

    // On filtre les données pour récupérer juste la Region qui nous intéresse
    const countryDataRegion = countriesData.filter(
        (country) => country.region.toLowerCase() === countryRegion); 

    res.json({region: countryDataRegion});
});

app.get('/search/:countryByRegion', (req, res) => {
    const countryRegion = req.params.countryByRegion.toLowerCase();
    // const countryRegion = req.params.countryByRegion.toLowerCase();

    // On filtre les données pour récupérer juste la Region qui nous intéresse
    const countryDataSearchRegion = countriesData.filter(
        (country) => country.region.toLowerCase() === countryRegion); 

    res.json({region: countryDataSearchRegion});
});


app.listen(process.env.PORT, () => {
    console.log('Server started on port: ' + process.env.PORT);
})
