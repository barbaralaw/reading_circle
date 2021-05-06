
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=1e688c995111458cb0568a7d68c512b4`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    let i = 5;
    [...document.getElementsByClassName("news")].forEach((post, i) => {
      post.innerHTML = ` 
        <a target="_blank" href="${data.articles[i].url}">
                <img class="card-img" src='${data.articles[i].urlToImage}'>
                <div class="card-img-overlay">
                  <h3 class="card-title">${data.articles[i].title}</h3>
 
              </div>
        </a>
      `;
    });
  }
  
  fetchNews()

  // <p class="card-text">${data.articles[i].description}</p> 