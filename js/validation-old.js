const formRegistration = document.querySelector('.contact-form');
const inputFields = formRegistration.querySelectorAll('.field-input');
const buttonAllClear = formRegistration.querySelector('.button-clear')
const form = document.forms.regform;

form.onsubmit = function () {
    let firstnameVal = form.firstname.value;
    let lastnameVal = form.lastname.value;
    let ageVal = form.age.value;
    let genderVal = form.querySelector('input[name="gender"]:checked')?.value;
    let countryVal = form.country.value;
    let emailVal = form.email.value;
    let passwordVal = form.password.value;
    let passConfirmVal = form.passwordConfirmation.value;

    const confirm = form.confirmCheckbox;

    let emptyInputs = Array.from(inputFields).filter(input => input.value === '');

    checkingFilledFields(inputFields);
    checkGender(genderVal);
    checkConfirm(confirm);

    if (emptyInputs.length !== 0 || !genderVal || !confirm.checked) {
        // form.querySelector('.form-all-field-warninng').classList.add('warning');
        return false;
    }
    // else {
    //     form.querySelector('.form-all-field-warninng').classList.remove('warning');
    // }

    if (!validateNameAndLastName(firstnameVal)) {
        addWarning(form.firstname);
        return false;
    } else {
        removeWarning(form.firstname)
    }

    if (!validateNameAndLastName(lastnameVal)) {
        addWarning(form.lastname);
        return false;
    } else {
        removeWarning(form.lastname)
    }

    if (!validateAge(ageVal)) {
        addWarning(form.age);
        return false;
    } else {
        removeWarning(form.age)
    }

    if (countryVal === "none") {
        addWarning(form.country);
        return false;
    } else {
        removeWarning(form.country)
    }

    if (!validateEmail(emailVal)) {
        addWarning(form.email);
        return false;
    } else {
        removeWarning(form.email);
    }

    if (!validatePassword(passwordVal)) {
        addWarning(form.password);
        return false;
    } else {
        removeWarning(form.password);
    }

    if (passwordVal !== passConfirmVal) {
        addWarning(form.passwordConfirmation);
        return false;
    } else {
        removeWarning(form.passwordConfirmation);
    }
}

inputFields.forEach((listItem) => {
    listItem.addEventListener("change", function () {
        checkFilling(this.value, this)
    });
});

buttonAllClear.addEventListener("click", allClear);

function allClear() {
    inputFields.forEach((listItem) => {
        if (!listItem.classList.contains('form-select-input')) {
            listItem.parentNode.querySelector('.field-label').classList.remove('filled');
        }
        listItem.classList.remove("incorrect");
    });
    formRegistration.querySelector('.form-select-title').classList.remove("incorrect");
    formRegistration.querySelector('.form-radiobutton').style.color = "";
    formRegistration.querySelector('.form-checkbox-label').style.color = "";
    menuTitle.innerText = defValue;
}

function addWarning(element) {
    element.classList.add("incorrect");
    element.parentNode.querySelector('.form-field-warning')?.classList.add('warning');

}

function removeWarning(element) {
    element.parentNode.querySelector('.form-field-warning')?.classList.remove('warning');
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

function checkingFilledFields(element) {
    element.forEach(input => {
        if (input.value === "" || input.value === "none") {
            input.classList.add("incorrect");
        } else { input.classList.remove("incorrect"); }

        if (input.classList.contains("form-select-input") && input.classList.contains("incorrect")) {
            input.parentNode.querySelector('.form-select-title').classList.add("incorrect");
        }

        if (input.classList.contains("form-select-input") && !input.classList.contains("incorrect")) {
            input.parentNode.querySelector('.form-select-title').classList.remove("incorrect");
        }
    })
}

function checkGender(gender) {
    if (!gender) {
        formRegistration.querySelector('.form-radiobutton').style.color = "var(--color-warning)";
    } else {
        formRegistration.querySelector('.form-radiobutton').style.color = "";
    }
}

function validateAge(age) {
    if (age > 0 && age < 150) {
        return true;
    } else {
        return false;
    }
}

function checkConfirm(confirm) {
    if (!confirm.checked) {
        confirm.parentNode.querySelector('.form-checkbox-label').style.color = "var(--color-warning)";
    } else {
        confirm.parentNode.querySelector('.form-checkbox-label').style.color = "";
    }
}

function checkFilling(value, element) {
    const label = element.parentNode.querySelector('.field-label')
    if (value) {
        label.classList.add("filled");
    } else {
        label.classList.remove("filled");
    }
}