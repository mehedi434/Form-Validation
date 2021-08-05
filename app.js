/*
This is my first project, thats why code structure is not good.
*/

let fullName = document.getElementById("fullName");
let gender = document.getElementsByName("gender");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let division = document.getElementById("division");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let agree = document.getElementById("agree");

let fullNameOk =
    (genderOk =
    emailOk =
    phoneOk =
    divisionOk =
    passwordOk =
    passwordConfirmOk =
    agreeOk =
        false);
//
//
fullName.addEventListener("keyup", function (event) {
    nameValidation(3, 50, this);
});

let done = 0;
let userGender = "";
[...gender].forEach((genderInput) => {
    genderInput.addEventListener("change", function (event) {
        done++;
        if (genderInput.checked && genderInput.value == "male") {
            genderOk = true;
            errorRemove(genderInput);
            done--;
            userGender = genderInput.value;
        } else if (genderInput.checked && genderInput.value == "female") {
            genderOk = true;
            errorRemove(genderInput);
            userGender = genderInput.value;
        } else if (!genderInput.checked && done == 2) {
            genderOk = false;
            nothingSelectError(genderInput);
        }
    });
});

email.addEventListener("keyup", function (event) {
    emailValidation(320, this);
});

phone.addEventListener("keyup", function (event) {
    phoneValidation(14, this);
});

division.addEventListener("change", function (event) {
    if (!this.value) {
        nothingSelectError(this);
        divisionOk = false;
    } else {
        errorRemove(this);
        divisionOk = true;
    }
});

let passValid = false;
password.addEventListener("keyup", function (event) {
    let regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/g;
    let check = regex.test(this.value);

    let small = smallTag(this);
    let input_Title = this.parentElement.querySelector("p").innerText;

    let min = 6;
    let max = 20;

    if (this.value.length == 0) {
        small.innerHTML = `${input_Title} required`;
        passwordOk = false;
    } else if (this.value.length < min) {
        small.innerHTML = `${input_Title} should be more than ${min} characters`;
        passwordOk = false;
    } else if (this.value.length > max) {
        small.innerHTML = `${input_Title} should not be more than ${max} characters`;
        passwordOk = false;
    } else if (check == false) {
        small.innerHTML = `${input_Title} should contain at least One Letter, One Number and One Special Character (@$!%*#?&).`;
        passValid = false;
        passwordOk = false;
        //
        if (this.value == password2.value) {
            smallTag(password2).innerHTML =
                "Password matched but it's not valid";
            passwordConfirmOk = false;
        }
    } else {
        errorRemove(this);
        passValid = true;
        passwordOk = true;

        if (this.value == password2.value) {
            errorRemove(password2);
            passwordConfirmOk = true;
        } else if (this.value != password2.value) {
            let small = smallTag(password2);
            small.innerHTML = "Password not matched";
        }
    }
    //
});

password2.addEventListener("keyup", function (event) {
    let small = smallTag(this);

    if (this.value.length == 0) {
        small.innerHTML = "Password confirmation required";
        passwordConfirmOk = false;
    } else if (passValid == true && password.value == this.value) {
        errorRemove(this);
        passwordConfirmOk = true;
    } else if (passValid == false && password.value == this.value) {
        small.innerHTML = "Password matched but it's not valid";
        passwordConfirmOk = false;
    } else {
        small.innerHTML = "Password not matched";
        passwordConfirmOk = false;
    }
});

agree.addEventListener("change", function (event) {
    if (this.checked) {
        errorRemove(this);
        agreeOk = true;
    } else {
        let small = smallTag(this);
        small.innerHTML = `You have to agree with our terms and conditions`;
        agreeOk = false;
    }
});

/*After clicking on Submit Button verify all input, if any error found this will show.
If all correct it will Show User Info in a pop up modal & Reduce background color brightness of whole form.*/
let informationSection = document.querySelector(".informations");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.elements[9].type == "submit") {
        if (
            (fullNameOk &&
                genderOk &&
                emailOk &&
                phoneOk &&
                divisionOk &&
                passwordOk &&
                passwordConfirmOk &&
                agreeOk) == true
        ) {
            //Users info will store in this object
            let previewForm = {
                fullName: fullName.value,
                gender: userGender,
                email: email.value,
                phone: phone.value,
                division: division.value,
                password: password.value,
                agree: "Yes",
            };
            console.log(previewForm);

            //Added allOk class to show the section
            informationSection.classList.add("allOk");

            //When user info pop up modal appear the background color of form will change
            backgroundColorChange("change");

            //User info pushed in the html element
            informationSection.querySelector(
                ".P_fullName"
            ).innerHTML = `Full Name    : ${fullName.value}`;
            informationSection.querySelector(
                ".P_gender"
            ).innerHTML = `Gender       : ${userGender}`;
            informationSection.querySelector(
                ".P_email"
            ).innerHTML = `Email        : ${email.value}`;
            informationSection.querySelector(
                ".P_phone"
            ).innerHTML = `Phone Number : ${phone.value}`;
            informationSection.querySelector(
                ".P_division"
            ).innerHTML = `Division     : ${division.value}`;
            informationSection.querySelector(
                ".P_password"
            ).innerHTML = `Password     : ${password.value}`;
        } else {
            //if user click on submit button without typing or selecting anything on the filed, this will show error
            let arr = [
                fullNameOk,
                genderOk,
                genderOk,
                emailOk,
                phoneOk,
                divisionOk,
                passwordOk,
                passwordConfirmOk,
                agreeOk,
            ];

            arr.forEach((inputs, ind) => {
                if (!inputs) {
                    let errorText = {
                        fullName: "Full Name required",
                        gender: "You have to select your gender",
                        email: "Email required",
                        phone: "Phone Number required",
                        division: "Division required",
                        password: "Password required",
                        agree: "You have to agree with our terms and conditions",
                    };

                    let allInput = document.querySelectorAll("input,select");
                    let parent = allInput[ind].parentElement;
                    parent.classList.add("wrong");

                    let inputName = parent.querySelector("input,select");

                    let small = parent.getElementsByTagName("small")[0];

                    if (small.innerHTML == "") {
                        small.innerHTML = errorText[inputName.name];
                    } else if (small.innerHTML != "") {
                        small.innerHTML = small.innerHTML;
                    }
                }
            });
        }
    }
});

// This is for Rules Show and Hide
rulesButton.addEventListener("click", function () {
    let arrowIcon = document.querySelector("#rulesButton i.fas");
    let rules = document.querySelector(".rules");

    if (document.querySelector(".visible") == null) {
        //This will show the rules
        rules.classList.remove("hidden");
        rules.classList.add("visible");

        arrowIcon.classList.add("reverse");
    } else {
        //This will hide the rules
        rules.classList.remove("visible");
        rules.classList.add("hidden");

        arrowIcon.classList.remove("reverse");
    }
});

// Removes the User Information Pop Up modal
let cancelButton = document.querySelector("button#cancel i");
cancelButton.addEventListener("click", function () {
    backgroundColorChange("reverse");
    informationSection.classList.remove("allOk");
});

//If user Info Pop Up Modal opened and user click outside the Pop Up modal, the pop up modal will close.
window.addEventListener("click", function (event) {
    let nameAttribute = null;

    /*event.target.attributes[1].value
    This will not work everywhere because all content don't have any attributes, so, it will throw error and the function will not work.
    
    That's why i used try catch block to handle the error. */
    try {
        nameAttribute = event.target.attributes[1].value;
    } catch (error) {
        nameAttribute = null;
    }
    /*document.querySelector(".allOk") != null 
    will check the appearence of user info pop up Modal, if that is not available it will remain null.

    if user info pop up Modal available it will not null.*/
    if (document.querySelector(".allOk") != null && nameAttribute != "info") {
        backgroundColorChange("reverse");
        informationSection.classList.remove("allOk");
    }
});

//Below functions are Validation Function
//this will validate the fullName
function nameValidation(min, max, input) {
    let finalName = input.value.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");

    let regex = /^[a-z]([-']?[a-z]{1})*( [a-z]([-']?[a-z]+)*)+$/gi;
    let check = regex.test(finalName);

    let small = smallTag(input);
    let input_Title = input.parentElement.querySelector("p").innerText;

    if (finalName.length == 0) {
        small.innerHTML = `${input_Title} required`;
        fullNameOk = false;
    } else if (finalName.length < min) {
        small.innerHTML = `${input_Title} should be more than ${min} characters`;
        fullNameOk = false;
    } else if (finalName.length > max) {
        small.innerHTML = `${input_Title} should not be more than ${max} characters`;
        fullNameOk = false;
    } else if (!check) {
        small.innerHTML = `${input_Title} is not valid`;
        fullNameOk = false;
    } else {
        errorRemove(input);
        fullNameOk = true;
    }
}

//This will validate Email and Phone Number
function emailValidation(max, input) {
    let regexEmail =
        /^([a-z\d\._-]{3,30})@([a-z\d]{2,20})(\.[a-z]{2,8})(\.[a-z]{2,8})?$/i;
    let check = regexEmail.test(input.value);

    let small = smallTag(input);
    let input_Title = input.parentElement.querySelector("p").innerText;

    if (input.value.length == 0) {
        small.innerHTML = `${input_Title} required`;
        emailOk = false;
    } else if (input.value.length > max) {
        small.innerHTML = `${input_Title} is not valid and it should not be more than ${max} characters`;
        emailOk = false;
    } else if (check == false) {
        small.innerHTML = `${input_Title} is not valid`;
        emailOk = false;
    } else {
        errorRemove(input);
        emailOk = true;
    }
}

//this will validate the phone number
function phoneValidation(max, input) {
    let regexPhone = /^([88]{2})?([+88]{3})?01([35-9])([0-9]{8})$/gi;
    let check = regexPhone.test(input.value);

    let small = smallTag(input);
    let input_Title = input.parentElement.querySelector("p").innerText;

    if (input.value.length == 0) {
        small.innerHTML = `${input_Title} required`;
        phoneOk = false;
    } else if (input.value.length > max) {
        small.innerHTML = `${input_Title} is not valid and it should not be more than ${max} characters`;
        phoneOk = false;
    } else if (check == false) {
        small.innerHTML = `${input_Title} is not valid`;
        phoneOk = false;
    } else {
        errorRemove(input);
        phoneOk = true;
    }
}
//Validation Function End

//If any field remain unselected this will show error
function nothingSelectError(input, message) {
    let small = smallTag(input);
    let input_Title = input.parentElement.querySelector("p").innerText;

    small.innerHTML = `${input_Title} required`;
}

//this will clear previously showed errors
function errorRemove(input) {
    let small = smallTag(input);

    let parent = input.parentElement;
    parent.classList.remove("wrong");
    parent.classList.add("valid");
    small.innerHTML = "";
}

//this is small tag selector
function smallTag(input) {
    let parent = input.parentElement;
    parent.classList.add("wrong");
    parent.classList.remove("valid");

    return parent.getElementsByTagName("small")[0];
}

//When user info pop up Modal will appear, this will change the form and other content background color
function backgroundColorChange(condition) {
    let rulesSection = document.querySelector(".rules");
    let rulesButton0 = document.querySelector("#rulesButton");
    let form0 = document.querySelector("form");
    let body0 = document.querySelector("body");


    if (condition == "change") {
        rulesSection.classList.add("colorChange");
        rulesButton0.classList.add("colorChange");
        form0.classList.add("colorChange");
        body0.classList.add("colorChange");
    } else if (condition == "reverse") {
        rulesSection.classList.remove("colorChange");
        rulesButton0.classList.remove("colorChange");
        form0.classList.remove("colorChange");
        body0.classList.remove("colorChange");
    }
}
