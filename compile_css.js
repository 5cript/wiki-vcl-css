var fs = require('fs');
var path = require('path');

function getDirectories(source)
{
	return fs.readdirSync(source).filter(function(file) {
		return fs.statSync(path.join(source, file)).isDirectory() && file.charAt(0) != '.';
	});
}

function getFiles(source)
{
	return fs.readdirSync(source).filter(function(file) {
		return !fs.statSync(path.join(source, file)).isDirectory();
	});
}

var compiledCss = fs.openSync('./compiled.css', 'w');
var dirs = getDirectories('.');

for (var i in dirs)
{	
	var files = getFiles(dirs[i]);
	for (var j in files)
	{
		var content = fs.readFileSync('./' + dirs[i] + '/' + files[j]);
		fs.appendFileSync(compiledCss, content + '\n\n');
	}
}

fs.closeSync(compiledCss);