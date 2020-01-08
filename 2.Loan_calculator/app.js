// Select elements
const calculate = document.querySelector('#calculate');

const amount  = document.querySelector('#amount');
const percent = document.querySelector('#percent');
const months  = document.querySelector('#months');

const result_box = document.querySelector('#result_box');
const monthly_payment = document.querySelector('#monthly_payment');
const total_payment = document.querySelector('#total_payment');
const total_interest = document.querySelector('#total_interest');


// Add eventListeners
calculate.addEventListener('click',calculation);

function calculation(e){

	let amount_requested = amount.value;
	let percentage = percent.value/100;
	let months_ = months.value;

	e.preventDefault();
	if ((amount_requested === '')||(percentage === '')||(months_ === '')) {
		showError('Please fill in all inputs!');
	}else{

		//loading
		document.querySelector('img').style.display = 'block';
		setTimeout(loading,500);

		result_box.style.display = 'block';
		let t_amount = (amount_requested*(1+percentage)).toFixed(2);
		let m_payment = (t_amount/months_).toFixed(2);
		let t_interest = (t_amount-amount_requested).toFixed(2);;

		monthly_payment.innerHTML = m_payment;
		total_payment.innerHTML = t_amount;
		total_interest.innerHTML = t_interest;

	}

}

function showError (error){
	//create din and assign class to it
	const errorDiv = document.createElement('div');
	errorDiv.className = 'errorMessage';

	//insert textnode to the errorDiv
	errorDiv.appendChild(document.createTextNode(error));

	//Get elements (for insertion in the DOM)
	const container = document.querySelector('section:nth-child(1)');
	const head = document.querySelector('h1');

	//insert into the DOM
	container.insertBefore(errorDiv,head);

	//clear error after 3 sec
	setTimeout(clearError,3000);

}

function clearError (){
	document.querySelector('.errorMessage').remove();
}

function loading(){
	document.querySelector('img').remove();
}