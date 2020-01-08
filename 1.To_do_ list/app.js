//1 SELECTING ITEMS
const add_button = document.querySelector('#add');
const task_ = document.querySelector('input[type=text]');
const list_holder = document.querySelector('ul');
const clear_button = document.querySelector('clear');
const filter = document.querySelector('#filter');


//2 EVENT LISTENERS
//2.1 DOM Load event
document.addEventListener('DOMContentLoaded', getTask_list);

//2.2Adding tasks to the list
add_button.addEventListener('click',
	function AddItem(e){
	// Handling empty task	
	if(task_.value === '') {
	    alert('Add a task');
	    return('');
	  }

	else{
	//add to local storage
	storeTask(task_.value);

	getTask_list();

	//clear input
	task_.value = '';
	e.preventDefault();
	}
})

//2.3 Adding ability to delete task - using delegation
list_holder.addEventListener('click',delete_task);

//2.3 Adding ability to delete all tasks
clear.addEventListener('click', delete_task_list);


//2.4 Adding ability to filter
filter.addEventListener('keyup', filterTasks);



//3 FUNCTIONS 

//3.1 Storing tasks into local storage
function storeTask(task_name) {
	let tasks;
	if (localStorage.getItem('tasks')===null) {
		tasks=[];
	} else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task_name);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}


//3.2 Setting tasks list based on local storage
function getTask_list(e) {
	if (localStorage.getItem('tasks') !== null) {
		let tasks = JSON.parse(localStorage.getItem('tasks'));

		//when page is loaded
		if (e.type == 'DOMContentLoaded'){
				tasks = tasks; 
		}
		//when new task is created
		else{
			tasks = tasks.splice(0,(tasks.length-1))
		} 

		tasks.forEach( function (current_task) {

			//create elemnt li, assign class to it and fill in the text from input
			const task = document.createElement('li');
			task.className = 'line';
			task.appendChild(document.createTextNode(current_task));

			//icon handler - create a element, fill it in with the icon and append to li
			let icon = document.createElement('a');
			icon.innerHTML = '<i class="fas fa-trash-alt"> </i>';
			task.appendChild(icon);

			//append tasks to tasks list
			list_holder.appendChild(task);
		})
	}
}

//3.3 filtering items
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('li').forEach(function(task){

  	//.firstChild - вибирає тільки тексовий нод (plain text), бо якшо просто брати textContent - видає все, шо всередині, хоча в тому випадку і так норм:)
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


//3.4 deleting one task (from DOM and storage)
 function delete_task(e){
	if (e.target.classList.contains("fas")){
			let task_to_delete = e.target.parentElement.parentElement;
			
			let tasks_storage = JSON.parse(localStorage.getItem('tasks'));
			let del = task_to_delete.textContent.trim();
				tasks_storage.forEach(function(element,index){
					if (element==del) {
						tasks_storage.splice(index,1);
					}
				})
			
			localStorage.setItem('tasks',JSON.stringify(tasks_storage));
			task_to_delete.remove();
	}

}


//3.5 deleting tasks list (from DOM and storage)
 function delete_task_list(e){
// let tasks_list = document.querySelectorAll('li');
// 	tasks_list.forEach(function(li){
// 		li.remove();
// 	})

// // OR 
// taskList.innerHTML = '';

//OR
if (localStorage.getItem('tasks') !== null){
	let tasks_list = document.querySelector('ul');
	while(tasks_list.firstChild) {
	    tasks_list.removeChild(tasks_list.firstChild);
	  }

	 localStorage.removeItem('tasks');
}
}