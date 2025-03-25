<?php
// Connect to the database.
require("../../private/functions/db_credentials.php");

$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if(mysqli_connect_errno()){
    echo "connection error!";
    die(mysqli_connect_error());
}
?>

<?php
//Set CSS file.
echo '<style>'; 
include "../css/Formstyle.css"; 
echo '</style>';

require('../../private/shared/header.php');

echo "<lable>Filter </lable>
      <div class='row'>
        <lable>Pet Type </lable>
        <select name='pet_type'>
            <option value=''></option>
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='horse'>Horse</option>
            <option value='rabbit'>Rabbit</option>
            <option value='bird'>Bird</option>
            <option value='fish'>Fish</option>
            <option value='other'>Other</option>
        </select>
        <lable>Location </lable>
        <select name='location'>
            <option value=''></option>
            <option value='buranby'>Burnaby</option>
            <option value='surrey'>Surrey</option>
            <option value='richmond'>Richmond</option>
            <option value='vancouver'>Vancouver</option>
            <option value='delta'>Delta</option>
            <option value='langley'>Langley</option>
            <option value='coquitlam'>Coquitlam</option>
            <option value='north_vancouver'>North Vancouver</option>
            <option value='new_westminster'>New Westminster</option>
        </select>
      </div>
      
      <input type='submit' value='Search' />";

echo "<h1>Pet List: </h1>";

$general_query = "SELECT pet_id, pet_name, pet_type, location FROM pet";

$select_result = mysqli_query($connection, $general_query);

if(!$select_result){
    echo"query faled!";
    exit;
}

if(mysqli_num_rows($select_result) != 0){
    echo"<table class='resultTable'><tr>";          
        echo "<td class='tableGrid'><p class='tableHeader'>Pet ID</p></td>";  
        echo "<td class='tableGrid'><p class='tableHeader'>Pet Name</p></td>";   
        echo "<td class='tableGrid'><p class='tableHeader'>Pet Type</p></td>";  
        echo "<td class='tableGrid'><p class='tableHeader'>Location</p></td>";
    echo "</tr><tr>";
    while($row = mysqli_fetch_assoc($select_result)){
        $pet_id = $row['pet_id'];
        echo "<td class='tableGrid'><a href='pet_information.php?edit=$pet_id' id='link1'>". $row['pet_id']. "</a></td>";  
        echo "<td class='tableGrid'><a href='pet_information.php?edit=$pet_id' id='link1'>". $row['pet_name']. "</a></td>";
        echo "<td class='tableGrid'><a href='pet_information.php?edit=$pet_id' id='link1'>". $row['pet_type']. "</a></td>"; 
        echo "<td class='tableGrid'><a href='pet_information.php?edit=$pet_id' id='link1'>". $row['location']. "</a></td>";
        echo"</tr>";
    }
    echo"</table>";
}
//If result is empty, then show this warning.
else{
    echo"<tr>Result is empty!</tr>";
}


require('../../private/shared/header.php');
?>