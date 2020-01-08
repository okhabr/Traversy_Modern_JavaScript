class gitHub {

	constructor(object){

		this.client_id = 123;
		this.client_secret = 123;

		this.image = object.avatar_url;
		this.profileLink = object.html_url;

		this.publicRep = object.public_repos;
		this.publicGists = object.public_gists;
		this.followers = object.followers;
		this.following = object.following;
	
		this.location = object.location;
		this.company = object.company;
		this.web = object.blog;
		this.member_time = object.created_at.slice(0,10);
		this.repos = object.repos_url;
	}

	//Handle empty fields
	fixFields(){
		for (let prop in this){
			if ((this[prop] ==="") || (this[prop]===null)) {
				this[prop]='Sorry, no data available';
			}
		}		
	}
}


class gitHubReps {

	constructor(repObj){
		this.name = repObj.name;
		this.stars = repObj.stargazers_count;
		this.watchers = repObj.watchers_count;
		this.forks = repObj.forks_count;
	}
}

