// ce lance au démarage de la page
window.onload = () => {
    getAllCountries();
    document.getElementById("btnShowData").addEventListener("click", handleClick);
    document.getElementById("SendByRegion").addEventListener("click", handleClickRegion);
}

//  recupère la réponse server en json utilisable pour js
async function getAllCountries() {
    const res = await fetch("https://countries--api.herokuapp.com/all");
    const jsonRes = await res.json();
    updateList(jsonRes)
}

async function getRegionSearch(userSearchValue) {
    const res = await fetch(`https://countries--api.herokuapp.com/region/${userSearchValue}`);
    const jsonRes = await res.json();
    updateList(jsonRes.region);
}

async function getCountryByRegion(regionName) {
    const res = await fetch(`https://countries--api.herokuapp.com/search/${regionName}`);
    const jsonRes = await res.json();
    updateList(jsonRes.region);
}
async function getCountrySearch(userSearchValue) {
    const res = await fetch(`https://countries--api.herokuapp.com/country/${userSearchValue}`);
    const jsonRes = await res.json();
    updateList(jsonRes)
}

async function getCapitalSearch(userSearchValue) {
    const res = await fetch(`https://countries--api.herokuapp.com/capital/${userSearchValue}`)
    const jsonRes = await res.json();
    updateList(jsonRes)
}


updateList = (list) => {
    document.getElementById("list").innerHTML = "";
    let htmlList = "";

    list.forEach((country) => {
        htmlList +=
            `<div class="card">
            <p>${country.name}</p> 
            <p>${country.capital}</p> 
            </div>`;
    });
    document.getElementById("list").innerHTML = htmlList;
}


async function handleClick() {
    const radioInputName = document.querySelector("input[name=searcher]:checked").value;
    const userSearchValue = document.getElementById("userSearchValue").value;
    if (radioInputName === "country") {
        getCountrySearch(userSearchValue);
    } else if (radioInputName === "capital") {
        getCapitalSearch(userSearchValue);
    } else {
        getRegionSearch(userSearchValue)
    }
}
async function handleClickRegion(e) {
    e.preventDefault();
    const regionName = document.getElementById("countryByRegion").value;
    getCountryByRegion(regionName);
    document.getElementById("countryByRegion").value = "";
}