 $(document).ready(function() {
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
  
  //variable 
  var trainInformation = {
    train: trainName,
    dest: destination,
    firstT: firstTrain,
    freq: frequency
  };
      // Uploads train information data to the database
  database.ref().push(trainInformation);
    // Train Info
    console.log(trainInformation.train);
    console.log(trainInformation.destn);
    console.log(trainInformation.firstT);
    console.log(trainInformation.freq);

    // Clears all of the text-boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");

    alert("Train successfully added");
  });
  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

        // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().firstT;
    var frequency = childSnapshot.val().freq;

//////////////////////////////////////////////////

      // Create the new row
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(firstTrain),
          $("<td>").text(frequency),
        );
      
        // Append the new row to the table
        $("#scheduleTable > tbody").append(newRow);
  })
})