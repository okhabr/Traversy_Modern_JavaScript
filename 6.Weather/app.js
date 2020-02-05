save.addEventListener('click',showResult);

function showResult() {
    let searchedCity = change_city.value;
    fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?unitGroup=metric&location=${searchedCity}&aggregateHours=24`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
            "x-rapidapi-key": "941b993eadmsh30986d66941c067p1198a0jsn09b5f33a2c18"
        }
    })
    .then(res => {
        //Handle error
        if(!res.ok){
            throw new Error(data.error);
        }				
        return res.text();
    })
    .then (data => {
        let prepared = Weather.prepareData(data);
        let weather = new Weather(prepared);
        let ui = new UI();
        ui.changeText(weather);
        console.log(data);
    })
    .catch(err => {
        console.log('ERROR')
    })
}
//"https://visual-crossing-weather.p.rapidapi.com/history?shortColumnNames=false&startDateTime=2019-06-13T00:00:00&aggregateHours=24&location=Kyiv&endDateTime=2019-06-20T00:00:00&unitGroup=us"