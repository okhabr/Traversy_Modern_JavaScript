//Select button
document.querySelector('.get-jokes').addEventListener('click',jokesGenerator);

function jokesGenerator(e){
  const number = document.querySelector('#number').value;


  //AJAX request - create the object
  const xhr = new XMLHttpRequest();
  const parent = document.querySelector('.jokes');
  let output = '';
  
  xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`,true);
  
  xhr.onload = function() {
    if(this.status===200) {
     const jokes = JSON.parse(this.responseText).value;
      jokes.forEach( function(joke){
       output += `<li>${joke.joke}</li>`;
      });  
    }
    parent.innerHTML = output;
  }

  xhr.send();
  e.preventDefault();
}