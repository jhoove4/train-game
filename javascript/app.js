var config = {
    apiKey: "AIzaSyDorzGE8pgzurL0bLUqOjABCU-W2vU-LGo",
    authDomain: "train-game-b3a63.firebaseapp.com",
    databaseURL: "https://train-game-b3a63.firebaseio.com",
    storageBucket: "train-game-b3a63.appspot.com",
    messagingSenderId: "995355682664"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#addTrain").on('click', function(){
var trainName = $("#trainName").val().trim();
var trainDestination = $("#trainDestination").val().trim();
var firstTrainTime = $("#firstTrainTime").val().trim();
var frequency = $("#frequency").val().trim();
// var minutesAway = moment($("<th>").val().trim(), "DD/MM/YY").format('LT');

console.log('trainName', trainName);
console.log('trainDestination', trainDestination);
console.log('firstTrainTime', firstTrainTime);
console.log('frequency', frequency);
// console.log(minutesAway);

var newTrain = {
	trainName: trainName,
	trainDestination: trainDestination,
	firstTrainTime: firstTrainTime,
	frequency: frequency,

}

database.ref().push(newTrain);
	// trainName: trainName,
	// trainDestination: trainDestination,
	// firstTrainTime: firstTrainTime,
	// frequency: frequency,
alert("New Train Added! Woo WOO!");

$("#trainName").val("");
$("#trainDestination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");

return false;
});

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().trainDestination);
	console.log(childSnapshot.val().firstTrainTime);
	console.log(childSnapshot.val().frequency);

	$("#trainName").html(childSnapshot.val().trainName);
	$("#trainDestination").html(childSnapshot.val().trainDestination);
	$("#firstTrainTime").html(childSnapshot.val().firstTrainTime);
	$("#frequency").html(childSnapshot.val().frequency);
	var nextTrainData = getNextArrival(childSnapshot.val().firstTrainTime, childSnapshot.val().frequency)
	console.log(nextTrainData);
	// $("tbody").append("<tr><td>"  +childSnapshot.val().trainName+"  </td> <td>" +childSnapshot.val().trainDestination+" </td><td></td><td> "+childSnapshot.val().tMinutesTillTrain+" </td><td> "+childSnapshot.val().frequency+" </td><td> "+childSnapshot.val().nextTrain+" </td></tr>")
})

//new code from the weekend to help understand the process
function getNextArrival(firstTrainTime, frequency){ 
		
	
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

		return {
			nextTrain: tMinutesTillTrain,
			nextArrival: moment(nextTrain).format("hh:mm")

		}

}

