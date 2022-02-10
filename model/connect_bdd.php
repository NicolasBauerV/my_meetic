<?php

class Database {
    protected $db_server;
    protected $db_name;
    protected $db_login;
    protected $db_password;
    
    function __construct($db_server, $db_name, $db_login, $db_password) {
        $this->db_server   = $db_server;
        $this->db_name     = $db_name;
        $this->db_login    = $db_login;
        $this->db_password = $db_password;
    }

    function connect() {
        try {
            $db = new PDO("mysql:host=".$this->db_server.";dbname=".$this->db_name.";charset=utf8", $this->db_login, $this->db_password);
        } catch (PDOException $e) {
            print 'ERROR: '.$e->getMessage();
            die();
        }
        return $db;
    }
}