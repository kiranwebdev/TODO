$("#create-new-button").on('click', e => {
    e.preventDefault();
    $foldable = $("#main .panel-group");
    $random_string = makeid();    
});

$(document).on('click', '#submit-button', function(event) {
    var new_date = $("#new_date").val();
    var new_title = $("#new_title").val();
    var new_description = $("#new_description").val();
    if (new_date == '') {
        swal('Todo Date Cannot Be empty');
        return false;
    }
    if (new_title == '') {
        swal('Todo Title Cannot Be empty');
        return false;
    }
    if (new_description == '') {
        swal('Todo Description Cannot Be empty');
        return false;
    }

    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {  
       tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (id, title, description, todo_date, completed)');
    });
    db.transaction(function (tx) {
        var id = makeid();
        console.log('INSERT INTO TODO (id, title, description,  todo_date, completed) VALUES ( "'+id+'","'+new_title+'", "'+new_description+'", "'+new_date+'", 0)');
        tx.executeSql('INSERT INTO TODO (id, title, description,  todo_date, completed) VALUES ( "'+id+'","'+new_title+'", "'+new_description+'", "'+new_date+'", 0)');
        $(".panel-new .to-change-title").html(new_title);
        $("#new_title").closest('.form-group').remove();    
        swal('New TODO event created successfully');
        refresh_events();   
    });     
});



function refresh_events(){
    console.log('called');
    $("#main .panel-group").html('');
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM TODO', [], function (tx, results) {            
            var len = results.rows.length, i;
              for (i = 0; i < len; i++){       
                console.log(results.rows.item(i).completed);                         
                $foldable = $("#main .panel-group");
                $random_string = makeid(); 
                if (! results.rows.item(i).completed) {
                    $foldable.append('<div class="panel panel-default" data-db-id="'+results.rows.item(i).id+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#'+$random_string+'"><span class="glyphicon glyphicon-chevron-right"></span> <span class="to-change-title">'+results.rows.item(i).title+'</span></a></h4></div><div id="'+$random_string+'" class="panel-collapse collapse"><div class="panel-body"><div class="form-group"><h2>Date Due</h2><div class="input-group"   style="width: 250px"><input type="text" value="'+results.rows.item(i).todo_date+'" class="form-control date-picker" placeholder="Click to enter date" aria-describedby="basic-addon2"><span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></span></div></div><div class="form-group"><h2>Description</h2><textarea name="" placeholder="Enter Description" id="" rows="4" class="form-control text-description">'+results.rows.item(i).description+'</textarea></div><div class="form-group"><button class="btn btn-success save-button">Save Changes</button> <button class="btn btn-primary mark-button">Mark As Done</button>  <button class="btn btn-danger delete-button">Delete</button></div></div></div></div>');
                } else {
                    $foldable.append('<div class="panel panel-default completed-panel" data-db-id="'+results.rows.item(i).id+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#'+$random_string+'"><span class="glyphicon glyphicon-chevron-right"></span> <span class="to-change-title">'+results.rows.item(i).title+'</span></a></h4></div><div id="'+$random_string+'" class="panel-collapse collapse"><div class="panel-body"><div class="form-group"><h2>Date Due</h2><div class="input-group"   style="width: 250px"><input type="text" disabled value="'+results.rows.item(i).todo_date+'" class="form-control date-picker" placeholder="Click to enter date" aria-describedby="basic-addon2"><span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></span></div></div><div class="form-group"><h2>Description</h2><textarea disabled name="" placeholder="Enter Description" id="" rows="4" class="form-control text-description">'+results.rows.item(i).description+'</textarea></div><div class="form-group">  <button class="btn btn-danger delete-button">Delete</button></div></div></div></div>');                    
                }
                $(".date-picker").datepicker();                
              }
          }, null);
    });
}

jQuery(document).ready(function($) {
    refresh_events();
});

$(document).on('click', '.save-button', function(event) {
    var db_id = $(this).closest('.panel-default').attr('data-db-id');
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var new_date = $(this).closest('.panel-default').find('.date-picker').val();
    var new_description = $(this).closest('.panel-default').find('textarea').val();
    db.transaction(function (tx) {       
        tx.executeSql('UPDATE TODO SET description = "'+new_description+'",  todo_date = "'+new_date+'" WHERE id="'+db_id+'"');
        swal('Changes Saved Successfully');
        refresh_events();
    });
});

$(document).on('click', '.mark-button', function(event) {
    var db_id = $(this).closest('.panel-default').attr('data-db-id');
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);    
    db.transaction(function (tx) {       
        tx.executeSql('UPDATE TODO SET completed = 1');
        swal('Marked as Done Successfully');
        refresh_events();
    });
});

$(document).on('click', '.delete-button', function(event) {
    var db_id = $(this).closest('.panel-default').attr('data-db-id');
        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    swal({
      title: "Are you sure?",
      text: "This todo will be deleted",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){       
        db.transaction(function (tx) {
            console.log('DELETE FROM TODO WHERE id="'+db_id+'"');
            tx.executeSql('DELETE FROM TODO WHERE id="'+db_id+'"');
            swal('Todo Deleted Successfully');
            refresh_events();
        });
    });    
});

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}