//  $(document).ready(function() {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5fC3z9kS9mDQuoM05XGH5z08h-6JQ5Yg",
    authDomain: "train-scheduler-afac0.firebaseapp.com",
    databaseURL: "https://train-scheduler-afac0.firebaseio.com",
    projectId: "train-scheduler-afac0",
    storageBucket: "train-scheduler-afac0.appspot.com",
    messagingSenderId: "712583330990"
  };
  firebase.initializeApp(config);
  
  // Get a reference to the database service
  var database = firebase.database();
  
  
  // Click Button changes what is stored in firebase
  $("#submitBtn").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();
    
      // Change what is saved in firebase
      // database.ref().set({
        //set click event
      // });
  
  // Variables
  //Get inputs from bottom table (table2 in html)
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  
  // Uploads train information data to the database
  database.ref().push(trainInformation);
  
  //variable 
  var trainInformation = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
    
  
  //   console.log(trainInformation.trainName);
  
  
    // Clears all of the text-boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });
  database.ref().on("child_added", function(childSnapshot){
        // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;
    // Train Info
    console.log(trainInformation.trainName);
    console.log(trainInformation.destination);
    console.log(trainInformation.firstTrain);
    console.log(trainInformation.frequency);
    $("#trainName-input").text(snapshot.val().trainName);
      // Create the new row
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(empStartPretty),
          $("<td>").text(firstTrain),
          $("<td>").text(frequency),
        );
      
        // Append the new row to the table
        $("#scheduleTable > tbody").append(newRow);
  })
  