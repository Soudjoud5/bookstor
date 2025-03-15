<html>
    <head>
        <title>Display and Fetch Doctors</title>
        <style>
            *{

margin: 0;

padding: 0;

font-family: arial;

box-sizing: border-box;

}

body{

height: 100vh;

display: grid;

place-items: center;

background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6)), url(s.jpg);

background-size: 100% 100%;

background-repeat: no-repeat;

}

table{

width: 600px;

box-shadow: -1px 12px 12px -6px rgba(0,0,0,0.5);

}

table, td, th{

padding: 20px;

border: 1px solid lightgray;

border-collapse: collapse;

text-align: center;

cursor: pointer;

}

td{

font-size: 18px;

}

th{

background-color: blue;

color: white;

}

tr:nth-child(odd){

background-color: lightblue;

}

tr:nth-child(odd):hover{

background-color: dodgerblue;

color: white;

transform: scale(1.5);

transition: transform 300ms ease-in;

}

tr:nth-child(even){

background-color: #ededed;

}

tr:nth-child(even):hover{

background-color: lightgray;

transform: scale(1.5);

transition: transform 300ms ease-in;

}
            
        </style>
    </head>
    <body>
        <center>
            <table width="50%" border="1" cellpadding="5" cellspacing="5">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>speciality</th>
                        <th>address</th>
                        <th>phone</th>
                    </tr>
                </thead>
                <?php
                $connection = mysqli_connect("localhost", "root", "");
                $db = mysqli_select_db($connection, 'med');
                $query = "SELECT * FROM medcine WHERE speciality='Opstetrician'";
                $query_run = mysqli_query($connection, $query);

                while ($row = mysqli_fetch_array($query_run)) {
                    ?>
                    <tr>
                        <td><?php echo $row['id']; ?></td>
                        <td><?php echo $row['name']; ?></td>
                        <td><?php echo $row['speciality']; ?></td>
                        <td><?php echo $row['adress']; ?></td>

                        <td><?php echo $row['phone']; ?></td>
                    </tr>
                    <?php
                }
                ?>
            </table>
        </center>
    </body>
</html>