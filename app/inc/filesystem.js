window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

function errorHandler(e) {
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
  document.querySelector('#example-list-fs-ul').innerHTML = 'Error: ' + msg;
}

function initFS() {
  window.requestFileSystem(window.TEMPORARY, 1024*1024, function(filesystem) {
    fs = filesystem;
  }, errorHandler);
}

function writeFile(data){
	
	fs.root.getFile('db_stg.json', {create: true}, function(fileEntry) {
		
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function(fileWriter) {
			
			fileWriter.onwriteend = function(e) {
				console.log('Write completed.');
			};
			
			fileWriter.onerror = function(e) {
				console.log('Write failed: ' + e.toString());
			};
			
			// Create a new Blob and write it to log.txt.
			var blob = new Blob([data], {type: 'text/plain'});
			
			fileWriter.write(blob);
			
		}, errorHandler);
		
	}, errorHandler);
}

// Initiate filesystem on page load.
if (window.requestFileSystem) {
  initFS();
}