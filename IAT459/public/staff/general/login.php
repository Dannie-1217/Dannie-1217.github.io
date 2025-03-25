<?php require_once("../../../private/functions/initialization.php") ?>

<?php

    $user_name = '';
    $password = '';

    if(isset($_SESSION['user_name'])){
        header("Location: welcome.php");
        exit();
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(!empty($_POST['user_name']) && !empty($_POST["password"])){
            $user_query = "SELECT password FROM user WHERE user_name = '" . $_POST['user_name'] . "'";
            $user_res = mysqli_query($connection, $user_query);
            if(mysqli_num_rows($user_res) != 0){
                $password = mysqli_fetch_assoc($user_res)['password'];

                if(password_verify($_POST['password'], $password)){
                    $_SESSION['user_name'] = $_POST['user_name'];
                    header("Location: welcome.php");
                    exit();
                }else{
                    array_push($errors, "The entered password do not match our record");
                }
            }else{
                array_push($errors, "The account does not exist");
            }
        }else{
            array_push($errors, "Username or password field is not filled");
        }
    }
?>


<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Login</title>
    </head>

    <body>
        <h1>Login</h1>

        <form method = "POST", action="login.php">
            <label>Username:</label><br>
            <input type="text" name="user_name" value=""/><br>
            <label>Password</label><br>
            <input type="text" name="password" value=""/><br>
            <input type="submit" value="Login"/>
    </body>


</html>
