# train-scheduler
A page that uses moment.js to display when trains will be arriving and departing.

The form has form validation all field must be filled out in order to submit. 
When you delete a train from the list it deletes that same train from the firebase repository as well.
Minutes away and next arrival self update every 3 seconds. (Id like to figure out how to do this so it updates every minute on the minute)
HAHAHAHA evil laugh I did it it now updates every minute on the minute! NO longer shall I waist extra possessing power updating to often
(NOPE that just made it update ever millisecond)Aha! I pulled some components out took it out of a function and walla it's working again!


before you start create a folder inside of the assets/javascript file called keys.js.
Inside of keys.js print the fallowing variable.
    let FBKEY = "Put your fire base key here" 

crazy idea 2 gangs two trains 

Each trying to get there supplies to various stops along the way. 

How to set this up two opponents who have a train. Each train has several stops each stop has an average time between stops. Your goal is to get you train to each destination the quickest. You use your arsenal to enforce your train and deplete there's 


Requirements
App must suit these basic specs:
When adding trains, administrators should be able to submit the following:
Train Name
Destination
First Train Time -- in military time
Frequency -- in minutes
Calculate when the next train will arrive; relative to the current time.
Users from many different machines must be able to view same train times.
