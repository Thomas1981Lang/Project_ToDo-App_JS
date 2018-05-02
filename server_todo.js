// Module
var express = require( 'express' );
var fs = require( 'fs' );
var bp = require( 'body-parser' );
var sortBy = require('sort-array');


var app = express();
app.listen(5000,function() {
  console.log( 'Server gestartet, Port 5000'  );
});

app.use( express.static('.' ) );

app.use( bp.urlencoded({extended:true} ));


var toDoS;
fs.readFile( 'todo.json', function(err,data) {

  try {
    toDoS = JSON.parse(data); // wandle Inhalt in Objekt um
    console.log( 'initial load data', toDoS.todo );
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
    toDoS.todo.push( neuerToDo );
    fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
      response.writeHead(200,{'Content-Type':'application/json'});
      response.end( JSON.stringify({result:true}));
    });
  } else {
    response.status(500).end();
  }
});




app.post( '/zeigetodo', function(request,response) {
  response.writeHead(200,{'Content-Type':'application/json'});
    var sort = {
        order: request.body.order
    }

  sortBy(toDoS.todo, [sort.order, 'timecreate']);
  response.end( JSON.stringify(toDoS));
});




app.post( '/delete', function( request, response) {
    var deleteid = {
        id: request.body.id,
        timestamp: request.body.timestamp
    }

    if (deleteid.timestamp > tempStamp) {
     tempStamp = deleteid.timestamp * 1 + 8;
        toDoS.todo.splice( deleteid.id, 1 );
        fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end( JSON.stringify({result:true}));
        });
    } else {
        // Error
        response.status(500).end();
    }
});


app.post( '/done', function( request, response) {
    var doneid = {
        id: request.body.id,
        timestamp: request.body.timestamp
    }


    if (doneid.timestamp > tempStamp) {
        tempStamp = doneid.timestamp * 1 + 10;

        // Daten speichern
        toDoS.todo[doneid.id].done = 1;

        fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end( JSON.stringify({result:true}));
        });
    } else {
        // Error
        response.status(500).end();
    }
});


app.post( '/edit', function( request, response) {
    var edit = {
        id: request.body.id,
        task: request.body.task,
        comment:request.body.comment,
        option:request.body.option,
        date:request.body.date,
        prio:request.body.prio,
        timestamp: request.body.timestamp
    }

    if (edit.timestamp > tempStamp) {
        tempStamp = edit.timestamp * 1 + 10;

        // Daten speichern
        toDoS.todo[edit.id].task = edit.task;
        toDoS.todo[edit.id].comment = edit.comment;
        toDoS.todo[edit.id].option = edit.option;
        toDoS.todo[edit.id].date = edit.date;
        toDoS.todo[edit.id].prio = edit.prio;

        fs.writeFile( 'todo.json', JSON.stringify(toDoS), function(){
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end( JSON.stringify({result:true}));
        });
    } else {
        // Error
        response.status(500).end();
    }
});



app.get( '/', function(request,response){
  response.sendFile( __dirname+'/index.html' );
});
