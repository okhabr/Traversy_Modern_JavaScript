const input = document.querySelector("#search");
input.addEventListener('keyup', showCase);
const ui = new UI;

function showCase(e){
	//Get input text 
	let text = input.value;

	if(text!=='') {
		fetch(`https://api.github.com/users/${text}`)
		.then(res => {
			//Handle error
			console.log(res);
			if(!res.ok){
				throw new Error(data.error);
			}					
			return res.json();
		})
		.then (data => {
			console.log(data);
			//Handling top section
			const user = new gitHub(data);
			user.fixFields();

			ui.changeImage(user.image);
			ui.changeButton(user.profileLink);
			ui.changeCircles(user);
			ui.changeListInfo(user);

			//Handling bottom section - repositories
				fetch(`${user.repos}`)
					.then (resp => {
						//Handle error
						if(!resp.ok){
							throw new Error(resp.error);
							}
						return resp.json();
					})
					.then (function(data_R) {
						let rep_array = [];
						data_R.forEach(function(rep){
							let repository = new gitHubReps(rep);
							rep_array.push(repository);
						})	
					ui.createRep(rep_array);
				})
				document.querySelector(".hidden").style.display = 'block';	
		})
		.catch(err => ui.errorPopUp())
	}
};