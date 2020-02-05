let input = document.querySelectorAll('input');
for (let item of input){
    item.addEventListener('blur',checkInput);
}
function checkInput(e){
    let type = e.target.className;
    let text = e.target.value;
    let template;
    switch(type){
        case 'name':
            template = /^[A-Z]{1}[a-z]{0,} [A-Z]{1}[a-z]{0,}$/; 
            break;
        case 'phone':
            template = /^\+380\d{9}$/;
            break;
        case 'email':
            template = /^.{1,}\@\w{1,}\.[a-z]{3,4}$/;
            break;
        case 'zip':
            template = /^\d{5}$/;
            break;
    }
    if(!text.match(template)){
     e.target.parentNode.className = 'wrong';
    //  setTimeout(()=>e.target.parentNode.className = '',2000)           
    }else{
        e.target.parentNode.className = '';
    }
}