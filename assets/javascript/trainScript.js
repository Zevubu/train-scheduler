// planning notes at the bottum of file.

window.onload = function(){
    let newName;
    let newDestination;
    let firstTime;
    let frequency;
    let newTrain;
    let theTime;
    let consoledTrains = 0;
    let trainCount = 0;

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

   

    // need to make 2 functions for current time 


    let trainMaker = function(){
            database.ref().on("child_added", function(childSnapshot){
            // Are you kidding me! An 2 hours of work and all I needed to put in was childSnapshot.key!
            let key = childSnapshot.key;    
            // get names from firebase
            let trainNBlock = childSnapshot.val().trainName;
            let trainDBlock = childSnapshot.val().trainDestination;
            let trainFTBlock = childSnapshot.val().trainFirstTime;
            let trainFBlock = childSnapshot.val().trainFrequency;
                
            // first train pushed back a year.
            let firstTimeConverter = moment(trainFTBlock, "hh:mm:ss a").subtract(1,"months");
          
            // the difference between times.
            let diffTime = moment().diff(moment(firstTimeConverter), "minutes");
            
            // Time remainder before next train
            let timeRemainder = diffTime % trainFBlock;

            // the two below this need to self update... they do by updatiing them all.               
            // minutes until it get here.
            let minAway = trainFBlock - timeRemainder;
        
            // next train
            let nextTrain = moment().add(minAway, "minutes").format('hh:mm a');
                
            // make tr Element
            let addTrain = document.createElement("tr");
            addTrain.setAttribute("class", "tr-box")
                 
            //delete button. 
            let xTrap = document.createElement("td");
            let xNode = document.createTextNode("X");
            xTrap.setAttribute("class", "td-box button t-a-c")
            xTrap.addEventListener("click", function(){
                let closeTr = this.closest("tr");
                closeTr.remove();
                // lets the database no which child to remove
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
            nTrap.setAttribute("class", "td-box")
            let nNode = document.createTextNode(trainNBlock);
            nTrap.appendChild(nNode);
            addTrain.appendChild(nTrap);

            // train destination
            let dTrap = document.createElement("td");
            dTrap.setAttribute("class", "td-box")
            let dNode = document.createTextNode(trainDBlock);
            dTrap.appendChild(dNode);
            addTrain.appendChild(dTrap);

            // train frequency
            let fTrap = document.createElement("td");
            fTrap.setAttribute("class", "td-box")
            let fNode = document.createTextNode(trainFBlock);
            fTrap.appendChild(fNode);
            addTrain.appendChild(fTrap);
            
            // train start time.
            let naTrap = document.createElement("td");
            naTrap.setAttribute("class", "td-box")
            let naNode = document.createTextNode(nextTrain);
            naTrap.appendChild(naNode);
            addTrain.appendChild(naTrap);

            // minutes away from station
            let maTrap = document.createElement("td");
            maTrap.setAttribute("class", "td-box")
            let maNode = document.createTextNode(minAway);
            maTrap.appendChild(maNode);
            addTrain.appendChild(maTrap);
            theBaudy.appendChild(addTrain);
            
            // open section below to console log each train info.

                // console.log(`Name: ${trainNBlock}`);
                // console.log(`Destination: ${trainDBlock}`);
                // console.log(`Firt train of day: ${trainFTBlock}`);
                // console.log(`Frequency: ${trainFBlock}`);
                // console.log(`first time: ${firstTimeConverter}`);
                // console.log(`The time difference is: ${diffTime}`)
                // console.log(`remainder: ${timeRemainder}`)
                // console.log(`minutes away ${minAway}`)
                // console.log(`arrival time: ${nextTrain}`)
            
            
        },function(errorObject){
            console.log("The read failed: " + errorObject.code);
        });

        
    };
    trainMaker();

    // add new train on click
   
        let timeToUpdate = parseInt(moment().format('s'));
        console.log(`seconds into minute: ${timeToUpdate}`);
        timeToUpdate = (((60 - timeToUpdate) * 1000));
        console.log(`Seconds remaining times 1000: ${timeToUpdate}`);
    
    let updateCount = 0
    // I had to reproduce entire database child snap shot thing here to get my numbers to update.
    let timerUpdate = function(){
        theBaudy.innerHTML = ("");
        updateCount++;
        console.log(`times info updated: ${updateCount}`);
        trainMaker();
    };
    
    setInterval(timerUpdate, timeToUpdate);

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
        let nameCheck = newName.length
        let destCheck = newDestination.length
        let ftCheck = firstTime.length
        let fCheck = frequency.length
        console.log(`name check: ${nameCheck}`)
        console.log(`Destination check: ${destCheck}`)
        console.log(`first time check: ${ftCheck}`)
        console.log(`frequency check: ${fCheck}`)

        // form validation makes sure all feilds are filled out 
        if(nameCheck > 0 && destCheck > 0 && ftCheck > 0 && fCheck > 0){

        
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
            timerUpdate();
        }
        else{
            alert("All fields must be filled out! to submit a new train")
        }    
    });
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
       