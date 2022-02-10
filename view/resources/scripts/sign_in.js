$(document).ready(() => {
    checkUserConnected();
    connectUser();
});


const connectUser = () => {
    const email    = $('#email');
    const password = $('#password');
    const btnSub   = $('#btn-sub');
    btnSub.on('click', () => {
        $.ajax({
            type: "post",
            url: "../controller/user/member.php",
            data: {
                email : email.val(),
                password : password.val()
            },
            success: function (response) {
                console.log(response);
                if (response == "false" || response === "") {
                    $('#message').text("Please check your informations...");
                    $("#message").addClass('error');
                } else {
                    localStorage.setItem('id_user', response);
                    localStorage.setItem('connected', true);
                    window.location.href = "./member_page.html";
                }
            },
        });
    });
}

function checkUserConnected() {
    const isConnected = localStorage.getItem('connected');
    if (isConnected) {
        window.location.href = "./member_page.html";
    }
}