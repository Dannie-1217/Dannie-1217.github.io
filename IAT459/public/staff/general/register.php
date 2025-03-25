<?php require_once("../../../private/functions/initialization.php") ?>

<?php

    if(isset($_SESSION['user_name'])){
        header("Location: welcome.php");
        exit();
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user_name = mysqli_real_escape_string($connection, $_POST['user_name']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];
        $legal_name = mysqli_real_escape_string($connection, $_POST['legal_name']);
        $email = mysqli_real_escape_string($connection, $_POST['email']);
        $other_contact = mysqli_real_escape_string($connection, $_POST['other_contact']);
        $user_type = mysqli_real_escape_string($connection, $_POST['user_type']);


    // Password match check
    if ($password !== $confirm_password) {
        array_push($errors, 'Passwords do not match');
    } else {
        // Handle file upload
        $target_dir = PRIVATE_PATH . "/images/profilephoto";

        if (!is_dir($target_dir)) {
            array_push($errors, "The image folder does not exist");
        } else {
            $upload = true;
            $file_name = basename($_FILES["profile_photo"]["name"]);
            $target_file = $target_dir . $user_name. "_" . $file_name;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

            // Validate file upload
            if (isset($_FILES["profile_photo"]) && $_FILES["profile_photo"]["tmp_name"] != '') {
                $checkImg = getimagesize($_FILES["profile_photo"]["tmp_name"]);
                if ($checkImg === false) {
                    array_push($errors, "File is not a valid image.");
                    $upload = false;
                }
            } else {
                array_push($errors, "No file uploaded or file upload error.");
                $upload = false;
            }

            // Optional: check file size (e.g., max 2MB)
            if ($_FILES["profile_photo"]["size"] > 2000000) {
                array_push($errors, "Sorry, your file is too large. Max 2MB allowed.");
                $upload = false;
            }

            // Optional: only allow certain file formats
            $allowed_types = ['jpg', 'jpeg', 'png','webp'];
            if (!in_array($imageFileType, $allowed_types)) {
                array_push($errors, "Only JPG, JPEG, PNG & WEBP files are allowed.");
                $upload = false;
            }

            if ($upload) {
                if (move_uploaded_file($_FILES["profile_photo"]["tmp_name"], $target_file)) {
                    $password_hashed = password_hash($password, PASSWORD_DEFAULT);

                    // Check if username or email already exists
                    $checkQuery = "SELECT * FROM user WHERE user_name = '$user_name' OR email = '$email'";
                    $result = mysqli_query($connection, $checkQuery);

                    if (mysqli_num_rows($result) > 0) {
                        array_push($errors, "Username or Email already exists");
                    } else {
                        $insertQuery = "INSERT INTO user (user_name, password, legal_name, email, other_contact, profile_photo, user_type)
                                        VALUES ('$user_name', '$password_hashed', '$legal_name', '$email', '$other_contact', '$target_file', '$user_type')";
                                if (mysqli_query($connection, $insertQuery)) {
                            $_SESSION['user_name'] = $user_name;
                            header("Location: welcome.php");
                            exit();
                        } else {
                            array_push($errors, "Database error: " . mysqli_error($connection));
                        }
                    }
                } else {
                    array_push($errors, "Sorry, there was an error uploading your file.");
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>

<body>
    <h2>User Registration</h2>

    <?php
    if (!empty($errors)) {
        foreach ($errors as $err) {
            echo "<p style='color:red;'>$err</p>";
        }
    }
    ?>

    <form action="register.php" method="POST" enctype="multipart/form-data">
        <label>Username:</label><br>
        <input type="text" name="user_name" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <label>Confirm Password:</label><br>
        <input type="password" name="confirm_password" required><br><br>

        <label>Legal Name:</label><br>
        <input type="text" name="legal_name" required><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label>Other Contact (Phone):</label><br>
        <input type="text" name="other_contact"><br><br>

        <label>Profile Photo (Upload):</label><br>
        <input type="file" name="profile_photo" accept="image/*" required><br><br>

        <label>User Type:</label><br>
        <input type="radio" name="user_type" value="provider" required> Provider<br>
        <input type="radio" name="user_type" value="adopter" required> Adopter<br><br>

        <input type="submit" value="Register">
    </form>
</body>

</html>
