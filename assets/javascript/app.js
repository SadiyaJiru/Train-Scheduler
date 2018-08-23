// $(document).ready(function() {
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

    // Variables
    //Get inputs from bottom table (table2 in html)
    var trainName = $("#trainName-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "hh:mm").format("hh:mm");
    var frequency = $("#frequency-input")
      .val()
      .trim();

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
    console.log(trainInformation.dest);
    console.log(trainInformation.firstT);
    console.log(trainInformation.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().firstT;
    var frequency = childSnapshot.val().freq;


      // Train Info
      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);
      
    //////////////////////////////////////////////////
    //Current time
    var currentTime = moment();
    console.log("Current Time : " + moment(currentTime).format("hh:mm"));

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    //   // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    ///Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      // $("<td>").text(moment(firstTrain).format("HH:mm")),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(tMinutesTillTrain)
    );

    // Append the new row to the table
    $("#scheduleTable > tbody").append(newRow);
  });
// });
