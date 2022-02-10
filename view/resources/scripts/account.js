$(document).ready(() => {
    btnDisconnect();
    getInfosUser();
    sendUserInfos();
});

const sendUserInfos = () => {
    const emailInput       = $('#email');
    const inputPass        = $('#password');
    const inputPassConfirm = $('#password_conf');
    const btnSub           = $('#btn-sub');
    verifyPassword();
    btnSub.on('click', () => {
        $.ajax({
            type : "post",
            url  : "../controller/user/account.php",
            data : {
                email    : emailInput.val(),
                password : inputPass.val()
            },
            success: function (response) {
                const data = JSON.parse(response);
                if (data.sent == "ok") {
                    $('#message').text("Modification applied !");
                    $('#message').toggleClass("success");
                } else {
                    $('#message').text("");
                    $('#message').toggleClass("");
                }
            }
        });
        if (inputPass.val() == inputPassConfirm.val()) {
        }
    });
}

const verifyPassword = () => {
    const inputPass = $('#password');
    const inputPassConfirm = $('#password_conf');

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

const btnDisconnect = () => {
    $("#disconnect").on("click", () => {
        localStorage.clear();
        window.location.href = "./sign_in.html";
    });
}

const getInfosUser = () => {
    $.ajax({
        type: "post",
        url: "../controller/user/account.php",
        data : {
            id_user : localStorage.getItem('id_user')
        },
        success: function (response) {
            const data = JSON.parse(response);
            const user_data = document.querySelectorAll(".user_info");
            user_data[0].textContent = data.user_info.lastname;
            user_data[1].textContent = data.user_info.firstname;
            user_data[2].textContent = data.user_info.email;
            user_data[3].textContent = data.user_info.birthdate;
            user_data[4].textContent = data.user_info.gender;
            user_data[5].textContent = data.user_info.city;
            user_data[6].textContent = data.user_info.country;
        }
    });
}