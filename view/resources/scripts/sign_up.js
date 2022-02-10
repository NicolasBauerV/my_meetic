$(document).ready(() => {
    verifAge();
    const btnSub    = $('#btn-sub');
    const firstname = $('#firstname');
    const lastname  = $('#lastname');
    const password  = $('#password');
    const inputPassConfirm = $('#password_verif');
    const email     = $('#email');
    const birthdate = $('#birthdate');
    const city      = $('#city');
    let age         = 0;
    birthdate.change(() => {
        age = verifAge(birthdate.val());
        if (age <= 18) {
            birthdate.css('border', '3px solid red');
            $('#error_birthdate').text("You may have not the require age (only 18+)");
            $('#error_birthdate').css("color", 'red');
        } else {
            $('#error_birthdate').text("");
            birthdate.css('border', '3px solid green');
        }
    });
    verifyPassword();
    btnSub.on('click', () => {
        const country  = $('#country option:selected');
        const hobbies  = new Array();
        const checkbox = $('.checkbox:checked');
        const gender   = $('.inp_radio:checked');
        for (let i = 0; i < checkbox.length; i++) {
            hobbies.push(checkbox[i].value);
        }
        if ((password.val() == inputPassConfirm.val()) && age >= 18) {
            $.ajax({
                type: "post",
                url : "../controller/user/insert_user.php",
                data: {
                    firstname : firstname.val(),
                    lastname  : lastname.val(),
                    password  : password.val(),
                    email     : email.val(),
                    birthdate : birthdate.val(),
                    country   : country.val(),
                    city      : city.val(),
                    gender    : gender.val(),
                    hobbies   : hobbies
                },
                success: function (response) {
                    console.log(response);
                    if (response == "ok") {
                        $('#message').toggleClass('success', 1);
                        $('#message').text('Account created');
                    } else {
                        $('#message').toggleClass('error', 1);
                        $('#message').text('Error: Please verify the informations you gave to us');
                    }
                }
            });
        }
    });
});

const verifyPassword = () => {
    const inputPass = $('#password');
    const inputPassConfirm = $('#password_verif');

    inputPass.on('change', () => {
        if (inputPassConfirm.val() != inputPass.val()) {
            inputPass.css('border', '3px solid red');
            inputPassConfirm.css('border', '3px solid red');
        } else {
            inputPass.css('border', '3px solid green');
            inputPassConfirm.css('border', '3px solid green');
            return true;
        }
    });

    inputPassConfirm.on('change', () => {
        if (inputPass.val() != inputPassConfirm.val()) {
            inputPass.css('border', '3px solid red');
            inputPassConfirm.css('border', '3px solid red');
        } else {
            inputPass.css('border', '3px solid green');
            inputPassConfirm.css('border', '3px solid green');
            return true;
        }
    });
}

const verifAge = (birthdate) => {
    const date = new Date(birthdate);
    let monthDiff = Date.now() - date.getTime();
    const ageDate = new Date(monthDiff);
    let year = ageDate.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
}