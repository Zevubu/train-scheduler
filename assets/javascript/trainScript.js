// planning notes at the bottum of file.

window.onload = function(){
    let newName;
    let newDestination;
    let firstTime;
    let frequency;
    let newTrain;
    let theTime;
    let currentTime;

    let theBaudy = document.getElementById("the-baudy");
    // it's not tbody... it's The Baudy darling! So good it needed to be stated twice.
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

        
    setInterval(function(){
        theTime = moment().format('hh:mm:ss a')
        clock.innerHTML = (theTime);
        // console.log(`the time is ${theTime}`)
    }, 1000);

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

    // need to make 2 functions for current time 



    database.ref().on("child_added", function(childSnapshot){
        // Are you kidding me! An 2 hours of work and all I needed to put in was childSnapshot.key!
        let key = childSnapshot.key;    
        // get names from firebase
        let trainNBlock = childSnapshot.val().trainName;
        let trainDBlock = childSnapshot.val().trainDestination;
        let trainFTBlock = childSnapshot.val().trainFirstTime;
        let trainFBlock = childSnapshot.val().trainFrequency;
            
        console.log(trainNBlock);
        console.log(trainDBlock);
        console.log(trainFTBlock);
        console.log(trainFBlock);
            
        // first train pushed back a year.
        let firstTimeConverter = moment(trainFTBlock, "hh:mm:ss a").subtract(1,"months");
        console.log(`first time: ${firstTimeConverter}`);

        // the difference between times.
        let diffTime = moment().diff(moment(firstTimeConverter), "minutes");
            console.log(`The time difference is: ${diffTime}`)

        // Time remainder before next train
        let timeRemainder = diffTime % trainFBlock;
        console.log(`remainder: ${timeRemainder}`)

        // the two below this need to self update.
            
        // minutes until it get here.
        // if()
        let minAway = trainFBlock - timeRemainder;
        console.log(`minutes away ${minAway}`)

        // next train
        let nextTrain = moment().add(minAway, "minutes").format('hh:mm a');
        console.log(`arrival time: ${nextTrain}`)
            
        // make tr Element
        let addTrain = document.createElement("tr");
        // addTrain.setAttribute("lock", key)
                
        //delete button. 
        let xTrap = document.createElement("td");
        let xNode = document.createTextNode("X");
        xTrap.setAttribute("class", "button t-a-c")
        xTrap.addEventListener("click", function(){
        // console.log("click")
            let closeTr = this.closest("tr");
            closeTr.remove();
            
            var adaRef = firebase.database().ref(key);
                adaRef.remove().then(function() {
                console.log("Remove succeeded.")
                }).catch(function(error){
                console.log("Remove failed: " + error.message)
            });    
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
        let naTrap = document.createElement("td");
        naTrap.setAttribute("class", "next-time")
        let naNode = document.createTextNode(nextTrain);
        naTrap.appendChild(naNode);
        addTrain.appendChild(naTrap);

        // minutes away from station
        let maTrap = document.createElement("td");
        maTrap.setAttribute("class", "min-away")
        let maNode = document.createTextNode(minAway);
        maTrap.appendChild(maNode);
        addTrain.appendChild(maTrap);
        theBaudy.appendChild(addTrain);
        
    },function(errorObject){
        console.log("The read failed: " + errorObject.code);
    });

    // I had to reproduce entire database child snap shot thing here to get my numbers to update.
    let timerUpdate = function(){
        theBaudy.innerHTML = ("");
            database.ref().on("child_added", function(childSnapshot){
            let key = childSnapshot.key; 
            // get names from firebase
           
            trainNBlock = childSnapshot.val().trainName;
            trainDBlock = childSnapshot.val().trainDestination;
            trainFTBlock = childSnapshot.val().trainFirstTime;
            trainFBlock = childSnapshot.val().trainFrequency;
            // first train pushed back a year.
            firstTimeConverter = moment(trainFTBlock, "hh:mm:ss a").subtract(1,"months");
            // the difference between times.
            diffTime = moment().diff(moment(firstTimeConverter), "minutes");
            // Time remainder before next train
            timeRemainder = diffTime % trainFBlock;
            // minutes until it get here.
            minAway = trainFBlock - timeRemainder;
            // next train
            nextTrain = moment().add(minAway, "minutes").format('hh:mm a');
            // make tr Element
            addTrain = document.createElement("tr");
            addTrain.setAttribute("id", key)
            //delete button. 
            xTrap = document.createElement("td");
            xNode = document.createTextNode("X");
            xTrap.setAttribute("class", "button t-a-c")
            xTrap.addEventListener("click", function(){
                this.closest("tr").remove();
                var adaRef = firebase.database().ref(key);
                adaRef.remove().then(function() {
                console.log("Remove succeeded.")
                }).catch(function(error){
                console.log("Remove failed: " + error.message)
            });  
            });
            xTrap.appendChild(xNode);
            addTrain.appendChild(xTrap);
            // train name
            nTrap = document.createElement("td");
            nNode = document.createTextNode(trainNBlock);
            nTrap.appendChild(nNode);
            addTrain.appendChild(nTrap);
            // train destination
            dTrap = document.createElement("td");
            dNode = document.createTextNode(trainDBlock);
            dTrap.appendChild(dNode);
            addTrain.appendChild(dTrap);
            // train frequency
            fTrap = document.createElement("td");
            fNode = document.createTextNode(trainFBlock);
            fTrap.appendChild(fNode);
            addTrain.appendChild(fTrap);
            // train start time.
            naTrap = document.createElement("td");
            naTrap.setAttribute("class", "next-time")
            naNode = document.createTextNode(nextTrain);
            naTrap.appendChild(naNode);
            addTrain.appendChild(naTrap);
            // minutes away from station
            maTrap = document.createElement("td");
            maTrap.setAttribute("class", "min-away")
            maNode = document.createTextNode(minAway);
            maTrap.appendChild(maNode);
            addTrain.appendChild(maTrap);
            theBaudy.appendChild(addTrain);
    
        },function(errorObject){
            console.log("The read failed: " + errorObject.code);
        });
    };

    setInterval(timerUpdate, 1000);
  
}; 
    // an abandond atempt to make a timer to update next arrival and minutes away
    // intervalId = setInterval(count, 1000);
    // let timeConvert = timeConverter()

    // let timeConverter = function(t){
    //     let minutes = Math.floor(t/60);
    //     let seconds = Math.floor(minutes * 60);
        
    //     if
    // }

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
    // my early attepmts to delete old info from fire base.
    // let snap = child;
        // let key = snap.key
        // let value = snap.value
        // print("key = \(key)  value = \(value!)")
        // let key =  Object.keys(data)[0];
        // console.log(`the key is: ${key}`)
        // it's not tbody... it's The Baudy darling! So good it needed to be stated twice.
       