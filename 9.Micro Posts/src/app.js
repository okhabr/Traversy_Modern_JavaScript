// console.log('HI');
// import {http} from `http.js`;
// //Get posts on DOM Load
class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add'
    }

    showPosts(posts) {
        let output = '';
        posts.forEach((post) => {
            output += ` 
            <div class="card mb-3"> 
             <div class="card body"> 
              <h4 class="card-title"> ${post.title} </h4>
              <p class="card-text">${post.body}</p>
              <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a> 
              <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
             </div>
            </div>`
        })
        this.post.innerHTML = output;
    }
}
const ui = new UI();


//When page is loaded
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
    http.get('http://localhost:3000/posts')
     .then(data => ui.showPosts(data))
     .catch(err => console.log(`${err} WRONG`))
}


//Submit Post
document.querySelector(`.post-submit`).addEventListener('click', addPost);
function addPost() {
    if ( ui.formState == 'add') {
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;

        const data = {
            title: title,
            body: body
        }
        
        http.post('http://localhost:3000/posts', data)
        .then( data => {
            getPosts ();
        })
        .catch()
    }
}


//Delete post
document.querySelector(`#posts`).addEventListener('click', deletePost);
function deletePost(e) {
    const id = e.target.parentElement.dataset.id;
    if (e.target.className == `fa fa-remove`) {

        http.delete(`http://localhost:3000/posts/${id}`)
        .then( data => {
            console.log('Removed');
            getPosts();
        })
        .catch( err => console.log('Something went wrong'))
    }
    e.preventDefault();
}


//Edit post
document.querySelector(`#posts`).addEventListener('click', enableEdit);
function enableEdit(e) {
    const id = e.target.parentElement.dataset.id;
    if (e.target.className == `fa fa-pencil`) {
        //Change UI
        let title = e.target.parentElement.parentElement.children[0].textContent;
        let body = e.target.parentElement.parentElement.children[1].textContent;
        let id = e.target.parentElement.dataset.id;

        ui.titleInput.value = title;
        ui.bodyInput.value = body;

        ui.formState = 'edit';

         //Change db
        document.querySelector(`.post-submit`).addEventListener('click', changePost);
        function changePost (e) {
            const POST =  {
                id: id,
                title: document.querySelector('#title').value,
                body: document.querySelector('#body').value
            };
            if (ui.formState == 'edit') {                
                console.log(POST.title);
                http.put(`http://localhost:3000/posts/${POST.id}`, POST)
                .then( data => {
                    getPosts();
                })
                .catch( err => console.log('Something went wrong'))
                ui.formState = 'add';
            }
            e.preventDefault();
        }
    }
}