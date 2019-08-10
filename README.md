# train-scheduler
A page that uses moment.js to time trains and firebase to store and display them.

Before you start create a folder inside of the assets/javascript file called keys.js. 

Inside of keys.js print the fallowing variable.

    let FBKEY = "Put your fire base key here";
    
 ...or if I know you just message me and I'll give you mine.
<ul>
    <li>The form has form validation. All fields must be filled out in order to submit. 
    <li>When you delete a train from the list it deletes that same train from the firebase repository as well. Which was suprisingly hard to figure out yet easy to do now that I know how.
    <li>Minutes away and next arrival self update every 3 seconds. (Id like to figure out how to do this so it updates every minute on the minute)
    <li>HAHAHAHA evil laugh I did it it now updates every minute on the minute! NO longer shall I waist extra possessing power updating to often! NOPE! That just made it update ever millisecond :(  
    <li>Aha! I pulled some components out took it out of a function and walla it's working! It's Alive!
</ul>

<img src="assets/images/Screenshot (31).png">
Requirements:

When adding trains, administrators should be able to submit the following:
    <ul>
        <li>Train Name
        <li>Destination
        <li>First Train Time -- in military time
        <li>Frequency -- in minutes
        <li>Calculate when the next train will arrive; relative to the current time.
        <li>Users from many different machines must be able to view same train times.
    </ul>
crazy idea 2 gangs two trains(that I didn't end up doing )

Each trying to get there supplies to various stops along the way. 

How to set this up two opponents who have a train. Each train has several stops each stop has an average time between stops. Your goal is to get you train to each destination the quickest. You use your arsenal to enforce your train and deplete there's 



