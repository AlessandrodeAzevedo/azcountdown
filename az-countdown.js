/*
    Name   : az-countdown
    version: v0.1
    author : @alessandrodeazevedo
    license: MIT
*/
class AzCountdown
{
    elementID = 'AzCountdown';
    uri;
    key;
    localstorageKey;
    uniqId = this.guidGenerator();
    date = new Date(Date.now() + ( 3600 * 1000 * 168));
    labels = [];
    constructor ( obj = null) {
        this.labels['days'] = 'DAYS';
        this.labels['hours'] = 'HOURS';
        this.labels['minutes'] = 'MINUTES';
        this.labels['seconds'] = 'SECONDS';
        if (obj) {
            if (typeof obj.elementID !== 'undefined') {
                this.elementID = obj.elementID;
            }
            if (typeof obj.date !== 'undefined') {
                this.date = new Date(obj.date);
            }
            if (typeof obj.key !== 'undefined') {
                this.key = obj.key;
            }
            if (typeof obj.uri !== 'undefined') {
                this.uri = obj.uri;
            }
            if (typeof obj.localstorageKey !== 'undefined') {
                this.localstorageKey = obj.localstorageKey;
            }
            console.log(obj.labels);
            if (typeof obj.labels !== 'undefined') {
                if (typeof obj.labels.days !== 'undefined') {
                    this.labels['days'] = obj.labels.days;
                }   
                if (typeof obj.labels.hours !== 'undefined') {
                    this.labels['hours'] = obj.labels.hours;
                }   
                if (typeof obj.labels.minutes !== 'undefined') {
                    this.labels['minutes'] = obj.labels.minutes;
                }   
                if (typeof obj.labels.seconds !== 'undefined') {
                    this.labels['seconds'] = obj.labels.seconds;
                }   
            }

        }
        //this.getDateFromLocalStorage()
        let recipient = document.getElementById(this.elementID);
        let azCountdown = document.createElement('div');
        azCountdown.style.display = 'flex';
        azCountdown.style.justifyContent = 'space-around';
        azCountdown.style.padding = '20px 10px';
        azCountdown.id = `azCountdown_${this.uniqId}`;
        recipient.appendChild(azCountdown);
        this.azCreateElement(this.labels['days'], `azDays`);
        this.azCreateElement(this.labels['hours'], `azHours`);
        this.azCreateElement(this.labels['minutes'], `azMinutes`);
        this.azCreateElement(this.labels['seconds'], `azSeconds`, true);
        if (this.localstorageKey) {
            this.azCountdownSetCounter(
                this.getDateFromLocalStorage(),
                `#azDays_${this.uniqId}`,
                `#azHours_${this.uniqId}`,
                `#azMinutes_${this.uniqId}`,
                `#azSeconds_${this.uniqId}`
            );
        } else if (!this.uri) {
            this.azCountdownSetCounter(
                this.date,
                `#azDays_${this.uniqId}`,
                `#azHours_${this.uniqId}`,
                `#azMinutes_${this.uniqId}`,
                `#azSeconds_${this.uniqId}`
            );
        } else {
            this.file_get_contents(this.uri);
        }
    }
    getDateFromLocalStorage() {
        /* let date = localStorage.getItem(this.localstorageKey);
        if (!date) {
            localStorage.setItem(this.localstorageKey) = this.date;
        } else {
            date = new Date(date)
        } */
        return false; 
    }
    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4());
    }
    azCreateElement(label, id,isRed = false){
        let azCountdown = document.getElementById(`azCountdown_${this.uniqId}`);
        let azCountdownWrapper = document.createElement('div');
        azCountdownWrapper.style.backgroundColor = 'white';
        azCountdownWrapper.style.textAlign = 'center';
        azCountdownWrapper.style.minWidth = '55px';
        azCountdownWrapper.style.padding = '15px 10px';
        azCountdownWrapper.style.borderRadius = '5px';
        let azCountdownNumber = document.createElement('div');
        azCountdownNumber.style.fontFamily = 'Oswald, sans-serif';
        azCountdownNumber.style.fontSize = '45px';
        azCountdownNumber.innerHTML = 0;
        azCountdownNumber.id = id + '_' + this.uniqId;
        
        let azCountdownLabel = document.createElement('div');
        azCountdownLabel.style.color = 'rgb(155, 155, 155)';
        azCountdownLabel.style.fontSize = '10px';
        azCountdownLabel.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
        
        if (isRed){
            azCountdownWrapper.style.backgroundColor = 'rgba(208,2,27,1)';
            azCountdownNumber.style.color = 'white';
            azCountdownLabel.style.color = 'white';
        }
        azCountdownLabel.innerHTML = label;
        azCountdownWrapper.appendChild(azCountdownNumber);
        azCountdownWrapper.appendChild(azCountdownLabel);
        azCountdown.appendChild(azCountdownWrapper);
    }
    azCountdownSetCounter (date, id_days, id_hours, id_minutes, id_seconds) {
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = date - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            days = days >= 0 ? days : 0;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            hours = hours >= 0 ? hours : 0;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            minutes = minutes >= 0 ? minutes : 0;
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            seconds = seconds >= 0 ? seconds : 0;
            if (id_days) {
                document.querySelector(id_days).innerHTML = days;
            }
            if (id_hours) {
                document.querySelector(id_hours).innerHTML = hours;
            }
            if (id_minutes) {
                document.querySelector(id_minutes).innerHTML = minutes;
            }
            if (id_seconds) {
                document.querySelector(id_seconds).innerHTML = seconds;
            }
        },1000);
    }
    async file_get_contents(uri) {
        let res = await fetch(uri),
        ret = await res.text();
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(ret, "text/html");
        var educbrCountdown = doc.getElementsByTagName('az-countdown');
        for (let i = 0; educbrCountdown.length > i; i++) {
            let data = JSON.parse(educbrCountdown[i].innerHTML);
            if (data.key == this.key){
                this.azCountdownSetCounter(
                    new Date(data.date),
                    `#azDays_${this.uniqId}`,
                    `#azHours_${this.uniqId}`,
                    `#azMinutes_${this.uniqId}`,
                    `#azSeconds_${this.uniqId}`
                );
            }
        }
    }
}