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

console.log('trainName', trainName);
console.log('trainDestination', trainDestination);
console.log('firstTrainTime', firstTrainTime);
console.log('frequency', frequency);

database.ref().push({
	trainName: trainName,
	trainDestination: trainDestination,
	firstTrainTime: firstTrainTime,
	frequency: frequency,
})
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

	$("tbody").append("<tr><td>"  +childSnapshot.val().trainName+"  </td> <td>" +childSnapshot.val().trainDestination+" </td><td>" +childSnapshot.val().firstTrainTime+" </td><td> "+childSnapshot.val().frequency+" </td><td></td><td></td></tr>")
})

