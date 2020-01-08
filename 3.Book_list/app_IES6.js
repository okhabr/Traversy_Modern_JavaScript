
//Book class
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}

}


//UI Class
class UI {

	//Method, which adds book to the list
	addBookToList(book) {	

		//Get parent element
		const list = document.getElementById('book-list');

		//Create tr
		const row = document.createElement('tr');

		//Append td's
		row.innerHTML = `<td>${book.title}</td> 
		<td>${book.author} </td> 
		<td>${book.isbn} </td>
		<td><a href="#">X</a></td>`;

		//Append tds to tr
		list.appendChild(row);

	}
		
		
	//Method, which clears all input fields
	clearInputFields(){
		let inputs = document.querySelectorAll('input[type="text"]');
		inputs.forEach(function(input){
			input.value = '';
		})
	}

	//Method, which creates UI message (error/success)
	message(message_class,message_text) {

		//Create element, assign it to class and append textnode
		const user_message = document.createElement('div');
		user_message.className = message_class;
		user_message.appendChild(document.createTextNode(message_text));

		//Insert new div into the DOM
		const container = document.querySelector("#in");
		container.insertBefore(user_message, container.childNodes[1]);

		//Remove user message
		setTimeout(message_remove, 2000);
	}


	//Method, which removes book from the list
	remove(e) {
		if (e.target.tagName === 'A') {
			e.target.parentElement.parentElement.remove();
		}
	}	
}


//Local Storage class
class Store {

	//Returns list of books
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books=[];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks() {
		let books = Store.getBooks();
		const ui = new UI();

		books.forEach(function(book){
		ui.addBookToList(book);
		})
	}

	//Adds book to storage
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));
	}

	static removeBook(e){
		const books = Store.getBooks();
		const bookToDelete = e.target.parentElement.parentElement.childNodes[4].textContent.trim();

		if (e.target.tagName === 'A') {
			books.forEach(function(book,index){
				if(book.isbn==bookToDelete){
					books.splice(index,1);
				}			
			});
		localStorage.setItem('books',JSON.stringify(books));
		}
	}
}


//Event Listener - DOM Load
document.addEventListener('DOMContentLoaded', function(e){
	Store.displayBooks();
});

//Event Listener - add book
document.querySelector("#book-form").addEventListener('submit',
function (e){
	
	//Get from values
	const title = document.querySelector('#title').value,
		  author = document.querySelector('#author').value,
		  isbn = document.querySelector('#isbn').value;

	//New book object
	const book = new Book(title, author, isbn);

	//New object
	const ui = new UI();

	//Validate inputs
	if (title === ''||author === ''||isbn === ''){
		//Show error message
		ui.message('error','Please fill in all input fields');
	} else {

		//Show success message
		ui.message('success', 'Your book is added to the list');

		//Add book to list
		ui.addBookToList(book);

		//Add to storage
		Store.addBook(book);

		//Clear input fields
		ui.clearInputFields();

	}

	e.preventDefault();

});


//Event listener - remove book
document.querySelector('#book-list').addEventListener('click', function(e){
		//New object
		const ui = new UI();

		//Delete book from the UI
		ui.remove(e);

		//Delete book from the storage
		Store.removeBook(e);

		//Show success message
		ui.message('success', 'Your book is removed from the list');

		e.preventDefault();

})


//Additional functions
function message_remove(){
	document.querySelector("#in").childNodes[1].remove();

}