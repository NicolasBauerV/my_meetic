<?php

require '../../model/connect_bdd.php';

connectUser();

function connectUser() {
    $db = new Database('localhost', 'myMeetic', 'root', 'root');
    $db_access = $db->connect();

    $email    = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    if (empty($email) || empty($password)) {
        echo "false";
        die();
    }

    //Hash password
    $password = hash("sha256", "myMeet!c".$password);

    $query = verify_member_registred($db_access, $email);
    while ($userData = $query->fetch()) {
        $id_user = $userData['id'];
        if ($userData['password'] === $password) {
            echo $id_user;
        } else {
            echo "false";
        }
    }
}

function verify_member_registred($db_access, $email) {
    $query = $db_access->prepare('SELECT * from user WHERE email = ?');
    $query->execute(array($email));
    return $query;
}