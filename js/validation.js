const formRegistration = document.forms.regform;
const firstnameField = formRegistration.firstname;
const lastnameField = formRegistration.lastname;
const ageField = formRegistration.age;
const emailField = formRegistration.email;
const passwordField = formRegistration.password;
const confirmPasswordField = formRegistration.passwordConfirmation;

const confirmCheckbox = formRegistration.confirmCheckbox;

const countryField = formRegistration.country;
const countryFields = formRegistration.querySelectorAll('.form-select-item');
const countryTitle = formRegistration.querySelector('.form-select-title');
const countryFieldsDefault = countryTitle.textContent;

const genderFields = formRegistration.querySelector('.radiobuttons-wrapper');
let genderValue;

const inputFields = formRegistration.querySelectorAll('.field-input');
const warningMessedges = formRegistration.querySelectorAll('.form-field-warning');
const buttonAllClear = formRegistration.querySelector('.button-clear');
const viewPassword = formRegistration.querySelector('.view-password');

const avatarInput = formRegistration.querySelector('.form-input-avatar');
const viewImage = formRegistration.querySelector('.form-user-avatar');
const defaultAvatar = viewImage.src;

avatarInput.addEventListener('change', saveAvatar);

inputFields.forEach((listItem) => {
    listItem.addEventListener("change", function () {
        checkingFilling(this.value, this)
    });
});

firstnameField.addEventListener("change", function () {
    localStorage.setItem('firstname', this.value);
    let validation = validateNameAndLastName(this.value);
    validationIndication(validation, this)
})

lastnameField.addEventListener("change", function () {
    localStorage.setItem('lastname', this.value);
    let validation = validateNameAndLastName(this.value);
    validationIndication(validation, this)
})

ageField.addEventListener("change", function () {
    localStorage.setItem('age', this.value);
    let validation = validateAge(this.value);
    indicationWarnings(validation, this)
})

genderFields.addEventListener("click", function () {
    genderValue = formRegistration.querySelector('input[name="gender"]:checked')?.value;
    localStorage.setItem('gender', genderValue);
    // checkGender(genderValue);
})

countryTitle.addEventListener("click", function () {
    // if (countryField.value === "") {
    //     formRegistration.querySelector('.form-select-title')?.classList.add("incorrect")
    // } else {
    //     formRegistration.querySelector('.form-select-title')?.classList.remove("incorrect");
    // }

    countryFields.forEach(element => {
        console.log(element);
        element.addEventListener("click", function () {
            localStorage.setItem('country', countryField.value);
            // formRegistration.querySelector('.form-select-title')?.classList.remove("incorrect");
            // countryField.parentNode.querySelector('.form-field-warning')?.classList.remove('warning');
        })
    })
})

emailField.addEventListener("change", function () {
    localStorage.setItem('email', this.value);
    let validation = validateEmail(this.value);
    validationIndication(validation, this);
})

passwordField.addEventListener("change", function () {
    let validation = validatePassword(this.value);
    validationIndication(validation, this)
})

confirmPasswordField.addEventListener("change", function () {
    let validation = passwordField.value === confirmPasswordField.value;
    validationIndication(validation, this)
})

confirmCheckbox.addEventListener('click', checkConfirm)

viewPassword.addEventListener('click', showHidePassword)

buttonAllClear.addEventListener("click", allClear);

formRegistration.addEventListener('submit', (event) => {
    event.preventDefault();

    let emptyInputs = Array.from(inputFields).filter(input => input.classList.contains('mandatory') && input.value === '');

    emptyInputs.forEach(input => {
        if (input.value === '') {
            input.classList.add("incorrect");
        } else {
            input.classList.remove("incorrect");
        }
    })

    checkConfirm();

    // confirm validation
    if (!emptyInputs.length && confirmCheckbox.checked) {
        modal.classList.add('is-hidden');
        formRegistration.submit();
    }
})

// function block

function allClear() {
    inputFields.forEach((listItem) => {
        if (!listItem.classList.contains('form-select-input')) {
            listItem.parentNode.querySelector('.field-label')?.classList.remove('filled');
        }
        listItem.classList.remove("incorrect");
    });

    warningMessedges.forEach((listItem) => {
        listItem.classList.remove("warning");
        listItem.parentNode.style.marginBottom = "28px";
    });

    formRegistration.querySelector('.form-select-title')?.classList.remove("incorrect");
    formRegistration.querySelector('.form-radiobutton').style.color = "";
    formRegistration.querySelector('.form-checkbox-label').style.color = "";
    menuTitle.innerText = countryFieldsDefault;
    passwordField.type = "password";
    confirmPasswordField.type = "password";
    viewImage.src = defaultAvatar;
}

function addWarning(element) {
    element.parentNode.querySelector('.form-field-warning')?.classList.add('warning');
    element.parentNode.style.marginBottom = "22px";
}

function removeWarning(element) {
    element.parentNode.querySelector('.form-field-warning')?.classList.remove('warning');
    element.parentNode.style.marginBottom = "28px";
}

function validationIndication(condition, element) {
    if (!condition) {
        element.classList.add("incorrect");
        addWarning(element);
    } else {
        element.classList.remove("incorrect");
        removeWarning(element);
    }
}

function indicationWarnings(condition, element) {
    if (!condition) {
        addWarning(element);
    } else {
        removeWarning(element);
    }
}

function validateEmail(string) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(string).toLowerCase());
}

function validateNameAndLastName(string) {
    let reg = /^[a-zA-Zа-яёіїєА-ЯЁІЇЄ\s\-]+$/u;
    if (string.length >= 2) {
        return reg.test(String(string));
    } else {
        return false;
    }
}

function validatePassword(string) {
    let reg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return reg.test(String(string));
}

// function checkGender(gender) {
//     if (!gender) {
//         formRegistration.querySelector('.form-radiobutton').style.color = "var(--color-warning)";
//     } else {
//         formRegistration.querySelector('.form-radiobutton').style.color = "";
//     }
// }

function validateAge(age) {
    if (age > 18 && age < 99) {
        return true;
    } else {
        return false;
    }
}

function checkConfirm() {
    if (!confirmCheckbox.checked) {
        confirmCheckbox.parentNode.querySelector('.form-checkbox-label').style.color = "var(--color-warning)";
    } else {
        confirmCheckbox.parentNode.querySelector('.form-checkbox-label').style.color = "";
    }
}

function checkingFilling(value, element) {
    const label = element.parentNode.querySelector('.field-label')
    if (value) {
        label.classList.add("filled");
    } else {
        label.classList.remove("filled");
    }
}

function saveAvatar() {
    let f = this.files[0];
    if (f) {
        viewImage.src = URL.createObjectURL(f);
        localStorage.setItem('avatar', viewImage.src);
    }
    viewImage.src = localStorage.getItem('avatar')
}

function showHidePassword() {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        confirmPasswordField.type = "text";
    } else {
        passwordField.type = "password";
        confirmPasswordField.type = "password";
    }
}