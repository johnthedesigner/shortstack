<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/javascript; charset=utf8');
//error_reporting(0);

var_dump($_GET);

function viewJson(post){
	
}

function getStream($streamId) 
{
	//create the json feed
	
	//API Key
	$key = '02eeb8ae40e8091958919b7e189111e57ae1f002e080ecee64546ed81620f7c7';
	//Where to store feed cache
	$local_file = 'cache/streams/'.$streamId.'.json';
	//Build Feed URL
	$feedUrl = 'https://photorankapi-a.akamaihd.net/?stream='.$streamId.'&api_key='.$key.'&limit=45';

	if (is_file($local_file))
		{
			//Find out how many seconds it has been since the file was last updated - in seconds
			$time_lapse = (strtotime("now") - filemtime($local_file));
				//if it has been more than 10 minutes, update the local feed
				if ($time_lapse > 600) 
					{
						//grab the feed
						$feed_grab = file_get_contents($feedUrl);
							//check to make sure the feed has content and isn't just some error message
							if (strlen($feed_grab) > 50)
								{
									//if all  looks good, update the local feed
									file_put_contents($local_file, $feed_grab);
								}
 
 
					}			
 
 
		} 
 
	else 
		{
			//grab the feed
			$feed_grab = file_get_contents($feedUrl);
			//check to make sure the feed has content and isn't just some error message
				if (strlen($feed_grab) > 50)
					{
						//if all  looks good, update the local feed
						file_put_contents($local_file, $feed_grab);
					}
 
		}
 
echo 'olapiccallback('.file_get_contents($local_file).')';

}

function getPhoto($photoId) 
{
	//create the json feed
	
	//Where to store feed cache
	$local_file = 'cache/photos/'.$photoId.'.json';
	//API Key
	$key = '02eeb8ae40e8091958919b7e189111e57ae1f002e080ecee64546ed81620f7c7';
	//Build Feed URL
	$feedUrl = 'https://www.photorank.me/api/v1/photos/'.$photoId.'?api_key='.$key;
		
	if (is_file($local_file))
		{
			//Find out how many seconds it has been since the file was last updated - in seconds
			$time_lapse = (strtotime("now") - filemtime($local_file));
				//if it has been more than 10 minutes, update the local feed
				if ($time_lapse > 600) 
					{
						//grab the feed
						$feed_grab = file_get_contents($feedUrl);
							//check to make sure the feed has content and isn't just some error message
							if (strlen($feed_grab) > 50)
								{
									//if all  looks good, update the local feed
									file_put_contents($local_file, $feed_grab);
								}
 
 
					}			
 
 
		} 
 
	else 
		{
			//grab the feed
			$feed_grab = file_get_contents($feedUrl);
			//check to make sure the feed has content and isn't just some error message
				if (strlen($feed_grab) > 50)
					{
						//if all  looks good, update the local feed
						file_put_contents($local_file, $feed_grab);
					}
 
		}
 
echo file_get_contents($local_file);

}

if ( isset($_GET['streamId']) ) {
	//echo "test";
//	getStream($_GET['streamId']);	
} else if ( $_GET['photoId'] ) {
//	getPhoto($_GET['photoId']);	
} else {
	//echo "no function specified";
};

?>