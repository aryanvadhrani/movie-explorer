apiKey = "a42f3fd7";
url = `http://www.omdbapi.com/?apikey=${apiKey}&t=`;
let movieName = document.querySelector("#SearchInput");

let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", async function(){
    document.querySelector(".default-message").style.display = "none";
    
    let movie = movieName.value;
    movieName.value = "";
    let errorBox = document.querySelector(".error-box");
    let movieBox = document.querySelector(".movie-container");
    errorBox.innerText = "";
    if(movie != ""){
       try{
            let result = await getMovie(movie);
            if(result.Response == "False"){
                movieBox.style.display = "none";
                errorBox.innerText = result.Error;
            }
            else{
                errorBox.innerText = "";
                movieBox.style.display = "flex";
                resultShown(result);
            }
       }catch(er){
        console.log(er);
       }
        
    }
    else{
        errorBox.innerText = "Enter Movie Name!!";
        movieBox.style.display = "none";
    }
});

async function getMovie(movie){
    try{
        let req = await axios.get(url+movie);
        console.log(req.data);
        return req.data;
    }catch(er){
        console.log(er);
        return er;
    }
}

function resultShown(result){
    console.log(result);
    let movieTitle = document.querySelector(".movie-title");
    let ratings = document.querySelector(".rating");
    let releaseDate = document.querySelector(".release-date");
    let duration = document.querySelector(".duration");
    let plot = document.querySelector(".plot");
    let abtMovie = document.querySelector(".about-movie-section");
    abtMovie.innerHTML = "";
   
    movieTitle.innerText = result["Title"] || "Not Found";
    ratings.innerText = result?.["Ratings"]?.[0]?.["Value"]|| "Not Found";
    releaseDate.innerText = result?.Released ? `Released: ${result.Released}`: " Released :Not found";
    let genreString = result?.Genre ? result.Genre : "";
    if(genreString != ""){
        let genreAr = genreString.split(",");
        for(let genre of genreAr){
            let aboutMov = document.createElement("div");
            aboutMov.innerText = genre;
            aboutMov.classList.add("about-movie");
            abtMovie.append(aboutMov);
        }
    }
    duration.innerText = result?.Runtime ? `Duration: ${result.Runtime}`: " Duration :Not found";
    plot.innerText = result?.Plot ? `Plot: ${result.Plot}`: " Plot :Not found";
    document.querySelector(".movieImg").src =  result.Poster =="N/A" ?"/DOM/assets/img.jpg":result.Poster;
}


