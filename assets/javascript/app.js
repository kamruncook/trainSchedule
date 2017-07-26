$(document).ready(function(){
	
  	var config = {
	    apiKey: "AIzaSyAvKkvHK_tR9IR18hezfKDyEvxw7TUwqLo",
	    authDomain: "train-scheduler-3ec64.firebaseapp.com",
	    databaseURL: "https://train-scheduler-3ec64.firebaseio.com",
	    projectId: "train-scheduler-3ec64",
	    storageBucket: "train-scheduler-3ec64.appspot.com",
	    messagingSenderId: "222444693010"
  	};
  
  	// firebase.initializeApp(config);


	var trainData = new Firebase("https://train-scheduler-3ec64.firebaseio.com/");


	$("#addTrainBtn").on("click", function(){

		
		var trainName = $("#trainNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		var newTrain = {
			name:  trainName,
			line: lineName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		trainData.push(newTrain);

		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});
