<?php require_once("../../../private/functions/initialization.php") ?>

<?php

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $pet_name = mysqli_real_escape_string($connection, $_POST["pet_name"]);
        $location = mysqli_real_escape_string($connection, $_POST["location"]);
        $pet_type = mysqli_real_escape_string($connection, $_POST["pet_type"]);
        $description = mysqli_real_escape_string($connection, $_POST["description"]);
        $post_date = date("Y-m-d");


        // Insert pet infomation into "pet" table
        $insertPetQuery = "INSERT INTO pet (pet_name, location, pet_type, post_date, description)
        VALUES ('$pet_name' , '$location', '$pet_type', '$post_date', '$description')";

        if(mysqli_query($connection,$insertPetQuery)){
            $pet_id = mysqli_insert_id($connection);

            $target_dir = PRIVATE_PATH . "images/petimages";
            if (!is_dir($target_dir)){
                array_push($errors, "The image folder does not exist");
            } else{
                foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name){
                    $file_name = basename($_FILES['images']['name'][$key]);
                    $target_file = $target_dir . $pet_id . "_" . $file_name;
                    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

                    $allowed_types = ['jpg', 'jpeg', 'png', 'webp'];
                    if (in_array($imageFileType, $allowed_types)){
                        if(move_uploaded_file($tmp_name, $target_file)){
                            $imgQuery = "INSERT INTO pet_images(pet_id, images) VALUES ('$pet_id','$target_file')";
                            mysqli_query($connection, $imgQuery);
                        } else{
                            array_push($errors, "Failed to upload image: ".$file_name);
                        }
                    } else{
                        array_push($errors, "Invalid image format for: ".$file_name);
                    }
                }
            }
            if (empty($errors)) {
                echo "<p style='color:green;'>Pet Posted Successfully!</p>";
            }
        }else{
            array_push($errors, $mysqli_error($connection));
        }
    }


?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Post a Pet</title>
    </head>
    
    <body>
        <h1>Post a Pet</h1>

        <?php
            if (!empty($errors)) {
                foreach ($errors as $err) {
                echo "<p style='color:red;'>$err</p>";
                }
            }
        ?>

        <form action="post_pet.php" method="POST" enctype="multipart/form-data">
            <label>Pet Name: </label><br>
            <input type = "text" name = "pet_name" required/><br><br>

            <label>Location: </label><br>
            <input type= "text" name = "location" required/><br><br>

            <label>Pet Type:</lable><br>
            <select name = "pet_type" required>
                <option value = ""> -- Select Pet Type --</option>
                <option value = "dog">Dog</option>
                <option value = "cat">Cat</option>
                <option value="horse">Horse</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
                <option value="others">Others</option>
            </select><br><br>

            <label>Description: </label><br>
            <textarea name = "description" required></textarea><br><br>

            <label>Upload Pet Images: </label><br>
            <input type = "file" name = "images[]" multiple accept = "image/*"><br><br>

            <input type = "submit" value = "Post"/>

        </form>

    </body>
</html>

