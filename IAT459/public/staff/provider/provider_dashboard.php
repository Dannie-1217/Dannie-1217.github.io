<?php require_once("../../../private/functions/initialization.php") ?>

<?php
      if(!isset($_SESSION['user_name'])){
        header("Location: public/staff/login.php");
        exit();
      }
      
      $user_name = $_SESSION['user_name'];

      // Fetch user id based o username
      $userQuery = "SELECT user_id FROM user WHERE user_name = '$user_name'";
      $userResult = mysqli_query($connection, $userQuery);
      $userData = mysqli_fetch_assoc($userResult);
      $user_id = $userData['user_id'];

      // Get count of pets posted by the user
      $petCountQuery = "SELECT COUNT(*) AS pet_count FROM provide_records WHERE user_id = '$user_id'";
      $petCountResult = mysqli_query($connection, $petCountQuery);
      $petCount = mysqli_fetch_assoc($petCountResult)['pet_count'];

      // Get count of adoption requests for this provider
      $adoptionRequestCountQuery = "SELECT COUNT(*) AS adoption_request_count FROM adoption_records ar JOIN provide_records pr ON ar.pet_id = pr.pet_id WHERE pr.user_id = '$user_id'";
      $adoptionRequestCountResult = mysqli_query($connection, $adoptionRequestCountQuery);
      $adoptionRequestCount = mysqli_fetch_assoc($adoptionRequestCountResult)['adoption_request_count'];

      // Get recent 3 pet posts by this provider
      $recentPetsQuery = "SELECT pet.pet_name, pet.post_date 
                    FROM provide_records 
                    JOIN pet ON provide_records.pet_id = pet.pet_id 
                    WHERE provide_records.user_id = '$user_id' 
                    ORDER BY pet.post_date DESC 
                    LIMIT 3";
      $recentPetsResult = mysqli_query($connection, $recentPetsQuery);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Provider Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <h1 class="mb-4">Welcome, <?= htmlspecialchars($user_name) ?></h1>

    <!-- Stats Section -->
    <div class="row">
        <div class="col-md-4">
            <div class="card text-white bg-primary mb-3">
                <div class="card-body">
                    <h5 class="card-title">Pets Posted</h5>
                    <p class="card-text fs-2"><?= $petCount ?></p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card text-white bg-success mb-3">
                <div class="card-body">
                    <h5 class="card-title">Adoption Requests</h5>
                    <p class="card-text fs-2"><?= $adoptionRequestCount ?></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="card mt-4">
        <div class="card-header bg-dark text-white">Recent Pet Posts</div>
        <ul class="list-group list-group-flush">
            <?php while ($pet = mysqli_fetch_assoc($recentPetsResult)) : ?>
                <li class="list-group-item">
                    <?= htmlspecialchars($pet['pet_name']) ?> - Posted on <?= htmlspecialchars($pet['post_date']) ?>
                </li>
            <?php endwhile; ?>
        </ul>
    </div>

    <!-- Quick Actions -->
    <div class="mt-4">
        <a href="post_pet.php" class="btn btn-primary">Add New Pet</a>
        <a href="adoption_requests.php" class="btn btn-secondary">Manage Adoption Requests</a>
        <a href="logout.php" class="btn btn-danger">Logout</a>
    </div>
</div>
</body>
</html>