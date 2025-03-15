<!DOCTYPE html>
<html>
    <head>
        <title> doctors </title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }

            form {
                width: 300px;
                margin: 0 auto;
            }

            label {
                display: block;
                margin-top: 10px;
            }

            input[type="text"], input[type="number"], input[type="file"] {
                width: 100%;
                padding: 10px;
                margin-top: 5px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            input[type="submit"] {
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 4px;
            }

            input[type="submit"]:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <center>
            <form action="" method="post" enctype="multipart/form-data">
                <label> choose id: </label><br>
                <input type="hidden" name="id" id="id"/><br>
                <label> choose an name: </label><br>
                <input type="text" name="name" id="name"/><br>
                <label> choose an speciality: </label><br>
                <input type="text" name="speciality" id="speciality"/><br>
                <label> adress: </label><br>
                <input type="text" name="adress" id="adress"/><br>
                <label> phone: </label><br>
                <input type="number"name="phone" id="phone"/><br>
                <input type="submit" name="upload" value="upload"/></br>
            </form>
        </center>
    </body>
</html>
    
<?php
$connection = mysqli_connect("localhost", "root", "");
$db = mysqli_select_db($connection,'med');

if (isset($_POST['upload'])) {
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    $name = mysqli_real_escape_string($connection, $_POST['name']);
    $speciality = mysqli_real_escape_string($connection, $_POST['speciality']);
    $adress = mysqli_real_escape_string($connection, $_POST['adress']);
    $phone = mysqli_real_escape_string($connection, $_POST['phone']);

    $query = "INSERT INTO `medcine` (`id`, `name`, `speciality`,`adress`, `phone`) VALUES('$id', '$name','$speciality', '$adress', '$phone')";

    $query_run = mysqli_query($connection, $query);

    if ($query_run) {
        echo '<script type="text/javascript">alert("image profile uploaded")</script>';
    } else {
        echo '<script type="text/javascript">alert("image profile not uploaded")</script>';
    }
}
?>