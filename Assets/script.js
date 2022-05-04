// Assignment code here
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

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
    for (var i = 0; i < promptArray.length; i++) {
      var confirm = window.confirm(promptArray[i].question);
      if (confirm) {
        characterList = characterList + promptArray[i].string;
      }
    }
    var requirementsArray = [numberOfCharacters, characterList];
    return requirementsArray;
  }
}

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

//Write password to the #password input
function writePassword() {
  var characterArray = getRequirements();
  if (characterArray != "") {
    var password = generatePassword(characterArray);
    var passwordText = document.querySelector("#password");
    alert(password);
    passwordText.textContent = password;
  }
}
