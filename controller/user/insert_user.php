<?php

require '../../model/connect_bdd.php';

if (create_user()) {
    echo "ok";
} else {
    echo "User cannot be created";
}

function create_user() {
    $db = new Database('localhost', 'myMeetic', 'root', 'root');
    $db_access = $db->connect();

    $firstname = htmlspecialchars($_POST['firstname']); 
    $lastname  = htmlspecialchars($_POST['lastname']); 
    $gender    = htmlspecialchars($_POST['gender']);
    $email     = htmlspecialchars($_POST['email']); 
    $password  = htmlspecialchars($_POST['password']); 
    $birthdate = htmlspecialchars($_POST['birthdate']); 
    $city      = htmlspecialchars($_POST['city']); 
    $country   = htmlspecialchars($_POST['country']);

    $query = select_member($db_access, $email);
    $data = $query->fetch();

    // test if member already exist
    if ($data['email'] == $email) {
        return false;
    }

    //Hash password
    $password = hash("sha256", "myMeet!c".$password);

    insert_user_and_hobbies($db_access, $firstname, $lastname, $gender, $email, $password, $birthdate, $city, $country);

    $query = select_member($db_access, $email);
    $data = $query->fetch();
    $id_user = $data['id'];
    if (insert_user_hobby($db_access, $id_user, $_POST['hobbies'])) {
        return true;
    }
}

function insert_user_and_hobbies($db_access, $firstname, $lastname, $gender, $email, $password, $birthdate, $city, $country) {
    $query = $db_access->prepare('INSERT INTO user(firstname, lastname, gender, email, password, birthdate, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $query->execute(array($firstname, $lastname, $gender, $email, $password, $birthdate, $city, $country));
}

function insert_user_hobby($db_access, $id_user, $hobbies) {
    if (gettype($hobbies) == "array") {
        if (count($hobbies) > 1) {
            for ($i=0; $i < count($hobbies); $i++) { 
                $query = $db_access->prepare('INSERT INTO user_hobbie(id_user, hobbie_name) VALUES(?, ?)');
                $query->execute(array($id_user, $hobbies[$i]));
            }
            return true;
        } else {
            $query = $db_access->prepare('INSERT INTO user_hobbie(id_user, hobbie_name) VALUES(?, ?)');
            $query->execute(array($id_user, $hobbies[0]));
            return true;
        }
    }
}

function select_member($db_access, $email) {
    $query = $db_access->prepare('SELECT * FROM user WHERE email = ?');
    $query->execute(array($email));
    return $query;
}