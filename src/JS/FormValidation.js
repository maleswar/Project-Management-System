export function checkEmpty(id, name,span) {
    let value = document.getElementById(id).value;
    var errorMessage = document.getElementById(span);

    if (value === "") {
        errorMessage.textContent = name + " is Empty Please Check";
      document.getElementById(id).focus();
      return false;
    }
    return true;
  }

 export  function validateEmail(email,span) {
    var emailInput = document.getElementById(email);
    var errorMessage = document.getElementById(span);

    // Regular expression for a valid email address
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the provided email matches the regular expression
    if (emailRegex.test(emailInput.value)) {
        // Clear error message if the email is valid
        errorMessage.textContent = "";
        return true;
    } else {
        // Display specific error messages based on the issue
        if (emailInput.value === "") {
            errorMessage.textContent = "Please enter an email address.";
        } else {
            errorMessage.textContent = "Please enter a valid email address.";
        }
        return false;
    }
}  

export function validateRadio(option1Id, option2Id,span) {
    var option1 = document.getElementById(option1Id);
    var option2 = document.getElementById(option2Id);
    var errorMessage = document.getElementById(span);

    // Check if at least one radio button is selected
    if (option1.checked || option2.checked) {
        // Clear error message if at least one radio button is selected
        errorMessage.textContent = "";
        return true;
    } else {
        // Display error message if no radio button is selected
        errorMessage.textContent = "Please select a field.";
        return false;
    }
}

export function validateNumber(inputId,span) {
    var numberInput = document.getElementById(inputId);
    var errorMessage = document.getElementById(span);

    // Check if the input is a valid number
    if (!isNaN(numberInput.value) && numberInput.value.trim() !== "") {
        // Clear error message if the input is a valid number
        errorMessage.textContent = "";
        return true;
    } else {
        // Display error message if the input is not a valid number
        errorMessage.textContent = "Please enter a valid number.";
        return false;
    }
}


