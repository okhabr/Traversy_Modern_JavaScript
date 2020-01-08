//selectors
const general_container = document.querySelector('.container');
const image = document.querySelector('#image');
const button = document.querySelector('#profile');
const public_rep = document.querySelector('#repos');

const info_container = document.querySelector("#right div:last-child ul");
const rep_container = document.querySelector("#repositories ul");

const circle_container_top = document.querySelector("#right div:first-child");
const circle_container_bottom = document.querySelector("#rep_info");


class UI {

	//Image changing
	changeImage(img){
		image.innerHTML = `<img src="${img}" alt='Woop, somethig went wrong'>`;
	}

	//Button changing
	changeButton(link){
		button.setAttribute('href',`${link}`);
	}


	//These nice circles with general info - update
	changeCircles(user){	
		let circles = [
				{ text:`Public repositories: ${user.publicRep} `, class: 'blue circle'},
				{ text:`Public Gists: ${user.publicGists}`, class: 'green circle'},
				{ text:`Followers: ${user.followers}`, class: 'yellow circle'},
				{ text:`Following: ${user.following}`, class: 'grey circle'},
		]

		let	spans = circle_container_top.children;

			for (let i = 0; i < spans.length; i++ ){
				spans[i].innerHTML = circles[i].text;
				spans[i].classList = circles[i].class;
			}
	}


	//Information update
	changeListInfo(user) {
		const info_template = [`Company: ${user.company}`, `Website/blog: ${user.web}`, `Location: ${user.location}`, `Member since: ${user.member_time}` ];

		let info = info_container.children;
		for (let i = 0; i < info.length; i++){
			info[i].innerHTML = info_template[i];
		}

	}

	//Create new repository line
	createRep(reps) {
		
		rep_container.innerHTML = '';
		let self = this;
		reps.forEach( function (rep) {
			
			//Create list
			let li = document.createElement('li');
			//Create span for repository name
			let text_span = document.createElement('span');


			rep_container.appendChild(li);
			li.appendChild(text_span);
			text_span.appendChild(document.createTextNode(rep.name));
			self.createRepcircles(li,rep);
		})
	}

	createRepcircles(line,repos) {
		let circles_container = document.createElement('span');
		circles_container.classList = 'rep_info';

		line.appendChild(circles_container);

		let circles = [
				{ text:`Stars: ${repos.stars} `, class: 'blue circle circle-bottom'},
				{ text:`Watchers: ${repos.watchers}`, class: 'green circle circle-bottom'},
				{ text:`Forks: ${repos.forks}`, class: 'yellow circle circle-bottom'},
			]

		for (let i = 0; i < 3; i++ ){
				let span = document.createElement('span');
				
	 			span.innerHTML = circles[i].text;
	 			span.classList = circles[i].class;

	 			circles_container.appendChild(span);
	 		}
	}

	errorPopUp(){ 
		let errorBox = document.createElement('div');
		errorBox.innerHTML = 'Sorry, we\'ve faced an error!';
		errorBox.classList = 'border error';
		general_container.prepend(errorBox);
		setTimeout (function (){
			errorBox.remove();
		}, 2000)
	}
}