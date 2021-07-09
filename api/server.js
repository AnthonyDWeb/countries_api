const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

const countriesData = require("./countriesData.json");
app.get('/all', cors(), (req, res) => {


    let countries = countriesData.map((country) => (
        { name: country.name, capital: country.capital, region: country.region, currencie: country.currencies[0].name }
    ))
    res.json(countries)
})


app.get('/country/:countryName',cors(), (req, res) => {
    const countryName = req.params.countryName.toLowerCase();

    // On filtre les données pour récupérer juste le pays qui nous intéresse
    const countryData = countriesData.filter(
        (country) => country.name.toLowerCase() === countryName 
    );

    res.json([{name: countryData[0].name, capital: countryData[0].capital, region: countryData[0].region, currencie: countryData[0].currencies[0].name}]);
});




app.get('/capital/:countryCapital', cors(), (req, res) => {
    const countryCapital = req.params.countryCapital.toLowerCase();

    // On filtre les données pour récupérer juste la capital qui nous intéresse
    const countryData = countriesData.filter(
        (country) => country.capital.toLowerCase() === countryCapital
    ); 

    res.json([{name: countryData[0].name, capital: countryData[0].capital, region: countryData[0].region, currencie: countryData[0].currencies[0].name}]);
  
});


app.get('/region/:countryRegion', cors(), (req, res) => {
    const countryRegion = req.params.countryRegion.toLowerCase();

    // On filtre les données pour récupérer juste la capital qui nous intéresse
    const countryData = countriesData.filter(
        (country) => country.region.toLowerCase() === countryRegion
    ); 

    res.json({region: countryData});
});



const port = 8000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
})