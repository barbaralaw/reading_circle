const deleteBtn = document.querySelectorAll('.del')
const postItem = document.querySelectorAll('span.not')
const searchBooks = document.getElementById('searchBooks')

// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

const submit = document.getElementById('submit')
const results = document.getElementById('results')

submit.addEventListener('click', searchGoogle)

function searchGoogle() {
  const title = document.getElementById('title')
  const author = document.getElementById('author')
  const url = "https://www.googleapis.com/books/v1/volumes?q="
  console.log('here')

  fetch (url+title.value)
    .then(res => res.json())
    .then(data => {
      console.log(data.items[0].volumeInfo.title)

      document.getElementById('searchGoogle').style.display = 'none'
      document.getElementById('post').style.display = 'block'

      for (let i=0; i<3; i++) {
        let bookDetails = {
          title: data.items[i].volumeInfo.title,
          authors: data.items[i].volumeInfo.authors,
          thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail
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
        let div = document.createElement('div')
        div.appendChild(thumb)
        div.appendChild(divRadio)
        results.appendChild(div)
        //let li = document.createElement('li')
        //li.innerText = data.items[i].volumeInfo.title
        //results.appendChild(li)
      }



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

const seeAllPosts = document.getElementById('seeAllPosts')
seeAllPosts.addEventListener('click', seePosts);

function seePosts() {
  document.getElementById('recentPosts').style.display = "none";
  document.getElementById('allPosts').style.display = "flex";
  document.getElementById('allPosts').style.flexWrap = "wrap";
}

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
