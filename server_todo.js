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

var tempStamp = 0;


app.post( '/todo', function( request, response) {
  var neuerToDo = {
    task: request.body.task,
    comment: request.body.comment,
    option: request.body.option,
    date: request.body.date,
    prio: request.body.prio * 1,
    timecreate: request.body.timecreate,
    timedone: request.body.timedone * 1,
      done: request.body.done
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




app.post( '/delete', function( request, response) {
    var deleteid = {
        id: request.body.id,
        timestamp: request.body.timestamp
    }

    console.log(deleteid.timestamp,'vor delete')
    console.log(tempStamp,'vor delete')

    if (deleteid.timestamp > tempStamp) {
     tempStamp = deleteid.timestamp * 1 + 10;
    console.log(deleteid.timestamp,'in abfrage')
        // Daten speichern
        toDoS.todo.splice( deleteid.id, 1 );
        fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end( JSON.stringify({result:true}));
        });
    }
});


app.post( '/done', function( request, response) {
    var doneid = {
        id: request.body.id,
        timestamp: request.body.timestamp
    }

    console.log(doneid.timestamp,'vor done')
    console.log(tempStamp,'vor done')
    console.log(toDoS.todo[doneid.id],'done id')


    if (doneid.timestamp > tempStamp) {
        tempStamp = doneid.timestamp * 1 + 10;
        console.log(doneid.timestamp,'in abfrage')
        // Daten speichern
        toDoS.todo[doneid.id].done = 1;
        console.log(toDoS.todo[doneid.id]);
        fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end( JSON.stringify({result:true}));
        });
    }
});




app.get( '/', function(request,response){
  response.sendFile( __dirname+'/index.html' );
});
