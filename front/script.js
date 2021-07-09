// ce lance au démarage de la page
window.onload = () => {
    getAllCountries();
    document.getElementById("btnShowData").addEventListener("click", handleClick);
    document.getElementById("SendByRegion").addEventListener("click", handleClickRegion);
}

//  recupère la réponse server en json utilisable pour js
async function getAllCountries() {
    const res = await fetch("http://localhost:8000/all");
    const jsonRes = await res.json();
    updateList(jsonRes)
}

async function getRegionSearch(userSearchValue) {
    const res = await fetch(`http://localhost:8000/region/${userSearchValue}`);
    const jsonRes = await res.json();
    console.log(jsonRes)
    updateList(jsonRes.region);
}

async function getCountryByRegion(countryByRegion) {
    const res = await fetch(`http://localhost:8000/region/${countryByRegion}`);
    const jsonRes = await res.json();
    console.log(jsonRes)
    updateList(jsonRes.region);
}
async function getCountrySearch(userSearchValue) {
    const res = await fetch(`http://localhost:8000/country/${userSearchValue}`);
    const jsonRes = await res.json();
    updateList(jsonRes)
}

async function getCapitalSearch(userSearchValue) {
    const res = await fetch(`http://localhost:8000/capital/${userSearchValue}`)
    const jsonRes = await res.json();
    updateList(jsonRes)
}


function updateList(list) {
    document.getElementById("list").innerHTML = "";
    let htmlList = "";
    list.forEach((country) => {
        htmlList +=
            `<li class="card">
            <p>${country.name},${country.capital}</p>
        </li>`;
    });
    document.getElementById("list").innerHTML = htmlList;
}


async function handleClick() {
    const radioInputName = document.querySelector("input[name=searcher]:checked").value;
    const userSearchValue = document.getElementById("userSearchValue").value;
    console.log(userSearchValue)
    if (radioInputName === "country") {
        getCountrySearch(userSearchValue);
    } else if (radioInputName === "capital") {
        getCapitalSearch(userSearchValue);
    } else {
        getRegionSearch(userSearchValue)
    }
}
async function handleClickRegion() {
    const regionName = document.getElementById("countryByRegion").value;
    console.log(regionName);
    getCountryByRegion(countryByRegion);
}