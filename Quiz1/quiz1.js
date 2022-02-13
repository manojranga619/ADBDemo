let baseAddress = 'https://localhost:3000/'; // 'https://adb1.azurewebsites.net/';
let blobBaseAddress = 'https://adbassignment.blob.core.windows.net/adbimages/';

var data = [
    { name: "ape", min: 2, max: 20,picture: "", charm: "ima ape here"},
    { name: "box", min: 2500, max: 40,picture: "", charm: "box lunch"},
    { name: "candy", min: 100, max: null,picture: "curly.jpg", charm: "no candy here"},
    { name: "dog", min: 110, max: 500,picture: "", charm: "phidoux is a good dog"},
    { name: "earth", min: 0, max: 100,picture: "earth.jpg", charm: ""},
    { name: "fly", min: 0, max: 90,picture: "", charm: ""},
    { name: "grape", min: 1000, max: 1010,picture: "", charm: "red or green or white grapes"},
    { name: "hat", min: 42, max: 42,picture: "hat.jpg", charm: "UTA"},
    { name: "int", min: 110, max: 500,picture: "", charm: ""},
    { name: "just", min: 400, max: 420,picture: "woolh.jpg", charm: "not just UTA"}
];

function showAll() {
    let htmlStr = "";
    data.forEach(_ => htmlStr += generateHtml(_));
    document.getElementById("content").innerHTML = htmlStr;
}

function showFiltered() {
    let v = document.getElementById("V").value;
    let htmlStr = "";
    let val = Number(v);
    let filteredData = data.filter(_ => _.min <= val && _.max >= val);
    filteredData.forEach(_ => htmlStr += generateHtml(_));
    document.getElementById("content").innerHTML = htmlStr;
}

function showCharms() {
    let v = document.getElementById("C").value;
    let htmlStr = "";
    let filteredData = data.filter(_ => _.charm && _.charm.includes(v));
    filteredData.forEach(_ => htmlStr += generateHtml(_));
    document.getElementById("content").innerHTML = htmlStr;
}

function generateHtml(obj) {
    let imgsrc = blobBaseAddress + obj.picture;
    let str = `<div>
    ${obj.name}
    ${obj.min}
    ${obj.max}
    ${obj.charm}
    <img src=${imgsrc} />
    </div>`;
    return str;
}