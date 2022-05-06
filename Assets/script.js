// Assignment code here
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

//prompts the user for the number of characters, and if the
//user wants lowercase, uppercase, numbers, and special characters in their password.
function getRequirements() {
  var numberOfCharacters = prompt(
    "How many characters do you want your password to be? Your password must be between 8 and 128 characters long."
  );
  if (numberOfCharacters < 8 || numberOfCharacters > 128) {
    alert(
      "This is not a valid input. Please try again and input a number between 8 and 128."
    );
    return;
  } else {
    var promptArray = [
      {
        question: "Are you sure that you want lowercase letters?",
        string: "abcdefghijklmnopqrstuvwxyz",
      },
      {
        question: "Are you sure that you want uppercase characters",
        string: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      { question: "Are you sure that you want numbers?", string: "0123456789" },
      {
        question: "Are you sure that you want special characters",
        string: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
      },
    ];
    var characterList = [];
    var confirm = [];
    var falseCount = 0;
    for (var i = 0; i < promptArray.length; i++) {
      confirm[i] = window.confirm(promptArray[i].question);
      if (confirm[i]) {
        characterList = characterList + promptArray[i].string;
      } else {
        falseCount += 1;
      }
    }
    if (falseCount === 4) {
      alert("Please choose at least one character type.");
      getRequirements();
    }
    var requirementsArray = [numberOfCharacters, characterList, confirm];
    return requirementsArray;
  }
}

//randomly generates the password
function generatePassword(array) {
  var passwordArray = [];
  var positionArray = [];
  var string = array[1];
  var number = array[0];
  for (var i = 0; i < number; i++) {
    var position = Math.floor(string.length * Math.random());
    passwordArray[i] = string[position];
    positionArray[i] = position;
  }
  var passwordString = passwordArray.join("");
  return passwordString;
}

function validatePassword(string, array) {
  //use regular expressions to validate password.
  //pass in the answer choices by making the confirm variable an array.
  //returns true or false depending on if the password is a valid password.
  var regexArray = [
    /[a-z]+/,
    /[A-Z]+/,
    /[0-9]+/,
    /[ !\"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]/,
  ];
  for (i = 0; i < array.length; i++) {
    if (array[i] === true) {
      var validationCheck = regexArray[i].test(string);
      if (validationCheck === false) {
        console.log(string + " is an invalid password");
        return false;
      }
    }
  }
  return true;
}

//Write password to the #password input
function writePassword() {
  var characterArray = getRequirements();
  if (characterArray != "") {
    var validPassword = "";
    while (validPassword === false || validPassword === "") {
      var password = generatePassword(characterArray);
      validPassword = validatePassword(password, characterArray[2]);
    }
    var passwordText = document.querySelector("#password");
    passwordText.textContent = password;
  }
}
