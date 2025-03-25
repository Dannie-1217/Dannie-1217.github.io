<?php
    require_once("initialization.php");


    if (isset($_GET['q'])) {
        $q = mysqli_real_escape_string($connection, $_GET['q']);
        $query = "SELECT user_name FROM user WHERE user_name LIKE '$q%' LIMIT 5";
        $result = mysqli_query($connection, $query);

        while ($row = mysqli_fetch_assoc($result)) {
            echo "<div class='suggestion-item' onclick=\"selectUsername('".$row['user_name']."')\">".$row['user_name']."</div>";
        }
    }
?>