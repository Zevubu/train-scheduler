window.onload = function(){
    let newName;
    let newDestination;
    let firstTime;
    let frequency;
    let newTrain;
    let theTime;
    let clock = document.getElementById("clock");
    let newTrainBtn = document.getElementById("new-train");
    let nameInput = document.getElementById("name-input");
    let destinationInput = document.getElementById("destination-input");
    let timeInput = document.getElementById("first-time-input");
    let frequencyInput = document.getElementById("frequency-input");
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


 

  
        
    setInterval(function(startTime){
        theTime = moment().format('hh:mm  a')
        clock.innerHTML = (theTime);
        console.log(`the time is ${theTime}`)
    }, 1000);

    // setInterval();




    newTrainBtn.addEventListener("click", function(){
        event.preventDefault();
        newName = nameInput.value.trim();
        console.log(newName);
        newDestination = destinationInput.value.trim();
        console.log(newDestination);
        firstTime = timeInput.value.trim();
        console.log(firstTime);
        frequency = frequencyInput.value.trim();
        console.log(frequency);

        newTrain = {
            trainName: newName,
            trainDestination: newDestination,
            trainFirstTime: firstTime,
            trainFrequency: frequency,
        };
        // need to add paramiters so you have to have all boxes filled

        database.ref().push(newTrain);
        console.log(newTrain);

        nameInput.value = "";
        destinationInput.value = "";
        timeInput.value = "";
        frequencyInput.value = "";
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        let child = childSnapshot.val();
        console.log(child);
        // it's not tbody... it's The Baudy darling! So good it needed to be stated twice.
        let theBaudy = document.getElementById("the-baudy");
        // get names from firebase
        let trainNBlock = childSnapshot.val().trainName;
        let trainDBlock = childSnapshot.val().trainDestination;
        let trainFTBlock = childSnapshot.val().trainFirstTime;
        let trainFBlock = childSnapshot.val().trainFrequency;

        // first train pushed back a year.
        let firstTimeConverter = moment(trainFTBlock, "hh:mm a").subtract(1,"years");
        console.log(`first time: ${firstTimeConverter}`);

        
       

        
        console.log(trainNBlock);
        console.log(trainDBlock);
        console.log(trainFTBlock);
        console.log(trainFBlock);
        let addTrain = document.createElement("tr");
        addTrain.setAttribute("value", child)
            
        //delete button. 
        let xTrap = document.createElement("td");
        let xNode = document.createTextNode("X");
        xTrap.setAttribute("class", "button t-a-c")
        xTrap.addEventListener("click", function(){
            console.log("click")
            // let fireVal = this.getAttribute("value")
            // database.remove(fireVal)
            this.closest("tr").remove();

        });
        xTrap.appendChild(xNode);
        addTrain.appendChild(xTrap);
        
        // train name
        let nTrap = document.createElement("td");
        let nNode = document.createTextNode(trainNBlock);
        nTrap.appendChild(nNode);
        addTrain.appendChild(nTrap);

        // train destination
        let dTrap = document.createElement("td");
        let dNode = document.createTextNode(trainDBlock);
        dTrap.appendChild(dNode);
        addTrain.appendChild(dTrap);

        // train frequency
        let fTrap = document.createElement("td");
        let fNode = document.createTextNode(trainFBlock);
        fTrap.appendChild(fNode);
        addTrain.appendChild(fTrap);
        
        // train start time.
        let ftTrap = document.createElement("td");
        let ftNode = document.createTextNode(trainFTBlock);
        ftTrap.appendChild(ftNode);
        addTrain.appendChild(ftTrap);

        theBaudy.appendChild(addTrain);
    });



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