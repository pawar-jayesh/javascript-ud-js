'use strict';

// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout{
    date = new Date();
    id = (Date.now() + "").slice(-10);
    clicks = 0;

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;       // km
        this.duration = duration;       // min
    };

    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }

    click(){
        this.clicks++;
    }
}

class Running extends Workout{
    type = "running";

    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace = function(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = "cycling";

    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed = function(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const run = new Running([39,-12], 5.2, 24, 178);
const cycling = new Cycling([39,-12], 27, 90, 520);

// Application architecture
class App{

    #map;
    #mapEvent;
    #workouts = [];
    #mapZoomLevel = 13;

    constructor(){
        this._getPosition();

        // data from local storage
        this._getLocalStorage();

        // event handlers
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField);
        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
    }

    _getPosition(){

        if(navigator.geolocation){  
            // geolocation
            // takes two callback fun, 1 success, 2 error
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
                alert("Could not get your location");
            });
        }

    };

    _loadMap(position){
        // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1741256541601}
        // console.log(position);      
        const { latitude } = position.coords;
        const longitude = position.coords.longitude;
        // console.log(latitude, longitude);       // 52.2022012 20.9430116

        // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

        const coords = [ latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // handling clicks on map
        this.#map.on("click", this._showForm.bind(this));
        this.#workouts.forEach((work) => {
            this._renderWorkoutMarker(work);
        });
    };

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    };

    _hideForm(){
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(() => {
            form.style.display = "grid";
        }, 1000);
    }

    _toggleElevationField(e){
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    };

    _newWorkout(event){

        const validInputs = (...inputs) => inputs.every((num) => Number.isFinite(num));
        const allPositive = (...inputs) => inputs.every((num) => num > 0);

        event.preventDefault();

        // data
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;
        // validation

        // object based on Activity
        if(type === "running"){
            const cadence = +inputCadence.value;
            
            if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Input should be a +ve number");

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if(type === "cycling"){
            const elevation = +inputElevation.value;

            if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert("Input should be a +ve number");

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // add new obj to workout
        this.#workouts.push(workout);

        // render workout on map
        this._renderWorkoutMarker(workout);

        // render workout on list
        this._renderWorkout(workout);

        // hide the form + clear the input
        this._hideForm();

        // set local storage
        this._setLocalStorage();
    
    };

    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup( { 
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        } ))
        .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === "running"){
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
            `
        }

        if(workout.type === "cycling"){
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>
            `
        }

        form.insertAdjacentHTML("afterend", html);
    }

    _moveToPopup(e){
        const workoutEl = e.target.closest(".workout");
        if(!workoutEl)  return;

        const workout = this.#workouts.find((work) => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });

        // workout.click();
        // console.log(workout.clicks);
    }

    _setLocalStorage(){
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem("workouts"));

        if(!data)   return;

        this.#workouts = data;
        this.#workouts.forEach((work) => {
            this._renderWorkout(work);
        });
        
    };

    reset(){
        localStorage.removeItem("workouts");
        location.reload();
    }
    
}

const app = new App();
// console.log(firstName);


