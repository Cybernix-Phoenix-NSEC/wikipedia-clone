const form = document.querySelector("form")
const search = document.querySelector("input")
const searchResult = document.querySelector(".results")


const apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var searchvalue = search.value;

    if(searchvalue === ""){
        alert("Search is empty");
        document.getElementById("results").style.visibility="hidden";
    }

    else{
        // document.getElementById("results").style.visibility="visible";
        // document.getElementById("results").innnerHTML=" `<h2>Hang on, while we search that for you</h2>` ";
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
        search.value = searchval;
    }
}

function displayResult(results)
{
    var printValue = "";

    results.query.search.forEach((e)=>{
        var resultUrl = `https://en.wikipedia.org/?curid=${e.pageid}`
        document.getElementById("results").style.visibility="visible";
        printValue += 

        `
    
            <h2>${e.title} (<a href=${resultUrl} target="__blank" style="text-decoration:none;">know more</a>) </h2>
            <p>${e.snippet}</p>
            <h4>Time: ${e.timestamp}</h4>
            <hr>

        `
        searchResult.innerHTML = printValue
    })

}