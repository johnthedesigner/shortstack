<?php
$db = new JsonTable("./data/db.json"); //parameter => your json file

$result = $db -> selectAll();

$db -> update ( "ID", 1, array("ID" => 1, "Name" => "Fani Zwidawurzn", "Age" => 66));

$db -> delete( "ID", 2 );