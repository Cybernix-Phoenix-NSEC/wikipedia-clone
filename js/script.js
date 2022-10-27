const form = document.querySelector("form")
const search = document.querySelector("input")
const searchResult = document.querySelector(".results")

const apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="


form.addEventListener("submit", (e) => {
    e.preventDefault();
    var searchvalue = search.value;

    if (searchvalue === "") {
        alert("Search is empty");
        document.getElementById("results").style.visibility = "hidden";
    }

    else {
        getResult(searchvalue);
    }
})


async function getResult(searchval) {
    const response = await fetch(apiUrl + searchval);
    const result = await response.json();
    if (result.query.search.length == 0) {
        alert("Not found!!");
        search.value = "";
    }
    else {
        displayResult(result);
        search.value = searchval;
    }
}

function displayResult(results) {
    var printValue = "";

    results.query.search.forEach((e) => {
        var resultUrl = `https://en.wikipedia.org/?curid=${e.pageid}`
        document.getElementById("results").style.visibility = "visible";
        printValue +=
            `
        <div class="result">
            <a href=${resultUrl} target="__blank" style="text-decoration:none;">
                <div class="heading">${e.title}</div>
                <div class="context">${e.snippet}</div>
                <div class="time">Time: ${e.timestamp}</div>
            </a>
        </div>
        `
        searchResult.innerHTML = printValue
    })

}