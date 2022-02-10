<?php

require '../../model/connect_bdd.php';

account_management();

function account_management() {
    $db                = new Database('localhost', 'myMeetic', 'root', 'root');
    $db_access         = $db->connect();
    $json_user_info = get_member($db_access);
    $multiple_response = array(
        "user_info" => $json_user_info,
    );
    
    if (update_info_user($db_access)) {
        $multiple_response["sent"] = "ok";
    }

    echo json_encode($multiple_response);
}

function get_member($db_access) {
    $query = $db_access->prepare("SELECT * FROM user WHERE id = ?");
    $query->execute(array($_POST['id_user']));

    $user_data    = $query->fetch();
    $current_info = array();
    foreach ($user_data as $key => $value) {
        if (gettype($key) != 'integer') {
            $current_info[$key] = $value;
        }
    }
    return $current_info;
}

function update_info_user($db_access) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    //Hash Password
    $password = hash("sha256", "myMeet!c".$password);

    $query = $db_access->prepare("UPDATE user SET email = ?, password = ?");
    if ($query->execute(array($email, $password))) {
        return true;
    }
    
}