$(document).ready(() => {
    getUserInfo();
});

const getUserInfo = () => {
    $.ajax({
        type: "post",
        url: "../controller/user/account.php",
        data : {
            id_user : localStorage.getItem('id_user')
        },
        success: function (response) {
            const data = JSON.parse(response);
            const greating = $('h1');
            greating.text("Welcome " + data.user_info.firstname + " " + data.user_info.lastname);
        }
    });
}