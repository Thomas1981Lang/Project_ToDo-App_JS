// Module
var express = require( 'express' );
var fs = require( 'fs' );
var bp = require( 'body-parser' );


var app = express();
app.listen(5000,function() {
  console.log( 'Server gestartet, Port 5000'  );
});

// sieh nach ob angefragte Datei im Ordner "static" liegt
// für statische Ressourcen (JS, CSS, Images, usw)
app.use( express.static('.' ) );

//wandelt POST-Daten in JS-Objekt request.body um
app.use( bp.urlencoded({extended:true} ));

// Request Daten werden als JSON mitgeschickt
// app.use( bp.json() );

var toDoS; //globale Variable
fs.readFile( 'todo.json', function(err,data) {
  //console.log( data.toString() ); Inhalt der Datei als String
  try {
    toDoS = JSON.parse(data); // wandle Inhalt in Objekt um
    console.log( 'initial load data', toDoS.todo ); // Zeige ToDo Array
  } catch(e) {
    console.log( 'todo.json ist fehlerhaft!' );
    toDoS = {todo:[]}; // Fallback wenn JSON-File fehlerhaft
  }
});

app.post( '/todo', function( request, response) {
  var neuerToDo = {
    task: request.body.task,
    comment: request.body.comment,
    option: request.body.option,
    date: request.body.date,
    prio: request.body.prio * 1,
  }

  if ( neuerToDo.task && neuerToDo.option && neuerToDo.date && neuerToDo.prio ) {
    // Daten speichern
    toDoS.todo.push( neuerToDo );
    fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
      response.writeHead(200,{'Content-Type':'application/json'});
      response.end( JSON.stringify({result:true}));
    });
  } else {
    // Error
    response.status(500).end();
  }

});


app.post( '/zeigetodo', function(request,response) {
  response.writeHead(200,{'Content-Type':'application/json'});
  response.end( JSON.stringify(toDoS));
});


app.get( '/', function(request,response){
  response.sendFile( __dirname+'/index.html' );
});
