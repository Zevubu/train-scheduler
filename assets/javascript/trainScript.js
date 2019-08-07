window.onload = function(){
    let newName;
    let newDestination;
    let firstTime;
    let frequency;
    let newTrain;
    
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

        database.ref().push(newTrain);
        console.log(newTrain);

        nameInput.value = "";
        destinationInput.value = "";
        timeInput.value = "";
        frequencyInput.value = "";
    });

    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());
        console.log(`snapshot length${childSnapshot.length}`)
        // it's not tbody... it's The Baudy darling! So good it needed to be stated twice.
        let theBaudy = document.getElementById("the-baudy");
        let trainNBlock = childSnapshot.val().trainName;
        let trainDBlock = childSnapshot.val().trainDestination;
        let trainFTBlock = childSnapshot.val().trainFirstTime;
        let trainFBlock = childSnapshot.val().trainFrequency;
        let trainAdder = [trainNBlock, trainDBlock, trainFTBlock,trainFBlock]
        
        console.log(trainNBlock);
        console.log(trainDBlock);
        console.log(trainFTBlock);
        console.log(trainFBlock);
        let addTrain = document.createElement("tr");
            

            let newButton = document.createElement("button");
            newButton.setAttribute("class", "delete")
            newButton.textContent = ("x")
            
            
            let nTrap = document.createElement("td");

        let nNode = document.createTextNode(trainNBlock);
        nTrap.appendChild(nNode);
        addTrain.appendChild(nTrap);
        let dTrap = document.createElement("td");
        let dNode = document.createTextNode(trainDBlock);
        dTrap.appendChild(dNode);
        addTrain.appendChild(dTrap);
        let ftTrap = document.createElement("td");
        let ftNode = document.createTextNode(trainFTBlock);
        ftTrap.appendChild(ftNode);
        addTrain.appendChild(ftTrap);
        let fTrap = document.createElement("td");
        let fNode = document.createTextNode(trainFBlock);
        fTrap.appendChild(fNode);
        addTrain.appendChild(fTrap);

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