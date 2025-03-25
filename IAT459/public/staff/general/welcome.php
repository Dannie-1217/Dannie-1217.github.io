<?php require_once("../../../private/functions/initialization.php") ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Username Auto-Complete</title>
    <style>
        #suggestion-box {
            border: 1px solid #ccc;
            max-height: 150px;
            overflow-y: auto;
            position: absolute;
            background: white;
            width: 200px;
        }
        .suggestion-item {
            padding: 5px;
            cursor: pointer;
        }
        .suggestion-item:hover {
            background-color: #f0f0f0;
        }
    </style>
</head>

<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
    <h2>Username Search</h2>
    <input type="text" id="search" placeholder="Type username...">
    <div id="suggestion-box"></div>

    <script>
        const searchInput = document.getElementById("search");
        const suggestionBox = document.getElementById("suggestion-box");

        searchInput.addEventListener("input", function () {
            let query = this.value;
            if (query.length < 1) {
                suggestionBox.innerHTML = "";
                return;
            }

            fetch("../../../private/functions/search.php?q=" + query)
                .then(response => response.text())
                .then(data => {
                    suggestionBox.innerHTML = data;
                });
        });

        function selectUsername(username) {
            searchInput.value = username;
            suggestionBox.innerHTML = "";
        }
    </script>
</body>

</html>
