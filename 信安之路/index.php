<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <?php
        $con = mysql_connect('localhost', 'root', '_R123oo456t');
        if (!$con) {
            die('Could not connect: ' . mysql_error());
        }
        mysql_select_db('centos', $con);
        $result = mysql_query('select * from people');
        while ($row = mysql_fetch_array($result)) {
            echo $row['id'] . '|' . $row['name'] . '|' . $row.age;
            echo '<br />';
        }
        mysql_close($con);
    ?>
</body>
</html>
