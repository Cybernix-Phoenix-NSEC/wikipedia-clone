const form = document.querySelector("form")
const search = document.querySelector("input")
const searchResult = document.querySelector(".results")


const apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var searchvalue = search.value;

    if(searchvalue === ""){
        alert("Search is empty");
       
    }

    else{
        getResult(searchvalue);
    }
})


async function getResult(searchval)
{
    const response = await fetch(apiUrl+searchval);
    const result = await response.json();
    if (result.query.search.length == 0) {
        alert("Not found!!");
        search.value = "";
    }
    else{
        displayResult(result);
        search.value = "";
    }
}

function displayResult(results)
{
    var printValue = "";

    results.query.search.forEach((e)=>{
        var resultUrl = `https://en.wikipedia.org/?curid=${e.pageid}`
        printValue += 

        `
       
            <h2>${e.title}</h2>
            <a href=${resultUrl} target="__blank">Know More</a>
            <p>${e.snippet}</p>
            <h3>Time: ${e.timestamp}</h3>
        `
        searchResult.innerHTML = printValue
    })

}