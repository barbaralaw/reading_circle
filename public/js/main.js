const deleteBtn = document.querySelectorAll('.del')
const postItem = document.querySelectorAll('span.not')
const searchBooks = document.getElementById('searchBooks')

// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

const submit = document.getElementById('submit')
const results = document.getElementById('results')
const moreResults = document.getElementById('moreResults')
const newSearch = document.getElementById('newSearch')
let searchResults = []
let start = 0;
let finish = start + 3;

function showData(start, finish) {
  for (let i=start; i<finish; i++) {
    console.log(searchResults[i])
    let bookDetails = {
      title: searchResults[i].volumeInfo.title,
      authors: searchResults[i].volumeInfo.authors,
      thumbnail: searchResults[i].volumeInfo.imageLinks.thumbnail
    }
    let thumb = document.createElement('img')
      thumb.src = bookDetails.thumbnail
      thumb.alt = bookDetails.title
    let input = document.createElement('input')
      input.type = 'radio'
      input.id = 'rd'+i
      input.name = 'foundBook'
      input.value = JSON.stringify(bookDetails)
    let label = document.createElement('label')
      label.for = bookDetails.title
      label.innerText = bookDetails.title
    let divRadio = document.createElement('div')
    divRadio.appendChild(input)
    divRadio.appendChild(label)
    let divCardBody = document.createElement('div')
    divCardBody.classList.add("card-body")
    divCardBody.appendChild(thumb)
    divCardBody.appendChild(divRadio)
    let divCard = document.createElement('div')
    divCard.classList.add("card")
    divCard.style.width = "18rem"
    divCard.appendChild(divCardBody)
    let divCol = document.createElement('div')
    divCol.classList.add("col-md-4")
    divCol.classList.add("d-flex")
    divCol.classList.add("justify-content-center")
    divCol.appendChild(divCard)
    results.appendChild(divCol)
  }
}

submit.addEventListener('click', searchGoogle)
moreResults.addEventListener('click', viewMoreResults)
newSearch.addEventListener('click', resetSearch)

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function resetSearch() {
  removeAllChildNodes(results)
  document.getElementById('searchGoogle').style.display = 'block'
  document.getElementById('post').style.display = 'none'
}

function viewMoreResults() {
  start += 3
  finish = start + 3
  // NEED TO CLEAR CURRENT RESULTS
  showData(start,finish)
}

function searchGoogle() {
  const title = document.getElementById('title')
  const author = document.getElementById('author')
  const url = "https://www.googleapis.com/books/v1/volumes?q="
  console.log('here')

  fetch (url+title.value)
    .then(res => res.json())
    .then(data => {
      searchResults = data.items;
      document.getElementById('searchGoogle').style.display = 'none'
      document.getElementById('post').style.display = 'block'
      /*
      declare a start and a finish
      set them to 0 and 3 initially
      button would increment by 3
      */

      showData(start,finish)
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}

  /* const xhr = new XMLHttpRequest
  xhr.onload = function() {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // This will run when the request is successful
        console.log('success!', xhr);
      } else {
        // This will run when it's not
        console.log('The request failed!');
      }

      // This will run either way
      // All three of these are optional, depending on what you're trying to do
      console.log('This always runs...');
    }

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send(); */


// function deleteIndividualPost(){
//     console.log('OJB')
// }

async function deletePost(){
    const postId = this.parentNode.dataset.id
    console.log(postId)
    try{
        const response = await fetch('post/deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

const seeAllMyPosts = document.getElementById('seeAllPosts')
seeAllMyPosts.addEventListener('click', seeAllPosts);

function seeAllPosts() {
  document.getElementById('recentPosts').style.display = "none";
  document.getElementById('allPosts').style.display = "flex";
  document.getElementById('allPosts').style.flexWrap = "wrap";
}

const seeLessMyPosts = document.getElementById('seeLessPosts')
seeLessMyPosts.addEventListener('click', seeLessPosts);

function seeLessPosts() {
  document.getElementById('recentPosts').style.display = "flex";
  document.getElementById('allPosts').style.display = "none";
  document.getElementById('allPosts').style.flexWrap = "wrap";
}


const myCarousel = document.querySelector('#myCarousel')
const carousel = new bootstrap.Carousel(myCarousel)

// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }
