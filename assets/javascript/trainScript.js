window.onload = function(){
    let newName;
    let trainDestination;
    let firstTime;
    let frequency;
    
    // link to firebase.
    var firebaseConfig = {
        apiKey: FBKEY,
        authDomain: "train-schedule-ccc8f.firebaseapp.com",
        databaseURL: "https://train-schedule-ccc8f.firebaseio.com",
        projectId: "train-schedule-ccc8f",
        storageBucket: "https://train-schedule-ccc8f.firebaseio.com/",
        messagingSenderId: "828168838602",
        appId: "1:828168838602:web:a1d62e2124039ada"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();
    console.log(database);

    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

    let averageTrainInterval = 7;
    let firstTrain = "03:00"
    let lastTrain = "23:00"


    let newTrainBtn = document.getElementById("new-train");
    let nameInput = document.getElementById("name-input");
    let destinationInput = document.getElementById("destination-input");
    let timeInput = document.getElementById("first-time-input");
    let frequencyInput = document.getElementById("frequency-input");
    

    newTrainBtn.addEventListener("click", function(){
        event.preventDefault();
        newName = nameInput.value.trim();
        console.log(newName);
        trainDestination = destinationInput.value.trim();
        console.log(trainDestination);
        firstTime = timeInput.value.trim();
        console.log(firstTime);
        frequency = frequencyInput.value.trim();
        console.log(frequency);



    })



    // pull data from my trian form.

    // push that data to fire base
    // pull from firebase to produce train data.
    // use timers to keep train running and looping 
    

    // Future plans:
    // use time converter to keep time up to date. 
    // When train arives hide main area and display train img with sound.
    // inBound and outBound
    // Determine number of stops and how they are spaced.
    // Average speed, also including speed up and slow down. 
    // So just Average time between each stop. 
    // maybe I could add in obsticles that hold the train up?
    // compeate with another player to keep there train preocupied. 
    // 
    
    // stops are set.
    // You are given a group of mersanaries who go and try and take on the train.
    // 


    // original time pushed back a year so it's definetly before this moment. 

    // current time. 
};