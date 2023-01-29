let usernameCheck = false;
let emailCheck = false;
let passwordCheck = false;
let samePasswordCheck = false;

function validUsername(ev) {
    let userNameEl = ev.target; 
    let userNameVal = userNameEl.value; 

    let lenPass = false;
    let charPass = false;
    //Check Length
    if (userNameVal.length < 3) {
        userNameErrLen.innerHTML = '*Username needs to be 3 or more letters';
    } else { 
        userNameErrLen.innerHTML = '';
        lenPass = true;
    }

    //Check letter
    // UpperCase 65-90  LowerCase 97-122
    if (!(userNameVal.charAt().match(/[a-zA-Z]/))) {
        userNameErrAlpha.innerHTML = '*Username must start with a letter';
    }
    else {
        userNameErrAlpha.innerHTML = '';
        charPass = true;
    }

    usernameCheck = lenPass && charPass;
}//end validateUsername

function validEmail(ev) {
    let emailEl = ev.target;
    let emailVal = emailEl.value;

    if (!emailVal.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.innerHTML = '*Invalid Email';
    } else {
        emailError.innerHTML = '';
        emailCheck = true;
    }    
}//end validEmail

function validPassword(ev) {
    let passwordEl = ev.target;
    let passwordVal = passwordEl.value; 

    let lenPass = false;
    let upperPass = false;
    let numPass = false;
    let specialPass = false;

    if (passwordVal.length < 8) {
        passwordErrorLen.innerHTML = '*Password must be 8 characters or more';
    } else {
        passwordErrorLen.innerHTML = '';
        lenPass = true;
    }

    if (!/[A-Z]/.test(passwordVal)) {
        passwordErrorUpper.innerHTML = '*Password must have an UPPERCASE letter';
    } else {
        passwordErrorUpper.innerHTML = '';
        upperPass = true;
    }

    if (!/[0-9]/.test(passwordVal)) {
        passwordErrorNum.innerHTML = '*Password must have a number';
    } else {
        passwordErrorNum.innerHTML = '';
        numPass = true;
    }

    const specialChars = /[/*-+!@#$^&~\[\]]/;
    if (!specialChars.test(passwordVal)) {
        passwordErrorSpecial.innerHTML = '*Password must have one of the following characters: /*-+!@#$^&~[]';
    } else {
        passwordErrorSpecial.innerHTML = '';
        specialPass = true;
    }

    passwordCheck = lenPass && upperPass && numPass && specialPass;
}//end validPassword

function passwordMatch(ev) {
    let passwordEl2 = ev.target; 
    let passwordVal2 = passwordEl2.value; 

    if (passwordVal2 != document.getElementById('password').value) {
        passMatchError.innerHTML = '*Passwords do not match';
    } else {
        passMatchError.innerHTML = '';
        samePasswordCheck = true;
    }
}//end passwordMatch

function validSubmission(ev) {
    if (!usernameCheck || !emailCheck || !passwordCheck || !samePasswordCheck) { //Change with globally declared booleans
        alert('Oops! You something is wrong with your information. Please check and try again.');
        ev.preventDefault();  
    }
}

document.getElementById('username').addEventListener('input', validUsername);
document.getElementById('email').addEventListener('input', validEmail);
document.getElementById('password').addEventListener('input', validPassword);
document.getElementById('comPassword').addEventListener('input', passwordMatch);
document.getElementById('submit').addEventListener('click', validSubmission);