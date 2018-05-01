var del_id;
var receive_todo
/*---------------------------------
---------- neuen Eintrag ----------
---------------------------------*/

$('#input_submit').on('click', function (event) {
    event.preventDefault();

    var neuerEintrag = {
        typ: 'neu',
        task: $('#task').val(),
        comment: $('#input_textarea').val(),
        option: $('#input_option').val(),
        date: $('#inpute_date').val(),
        prio: $('input[name=prio]:checked').val(),

    }
    console.log(neuerEintrag);
    $.ajax({
        url: 'http://localhost:5000/todo',
        method: 'POST',
        data: neuerEintrag
    })
});


/*---------------------------------
---------- Sortiere ToDO ----------
---------------------------------*/

$('.selection_form').on('change', function () {

    var sortTabelle = {
        typ: 'sortieren',
        sort: $('#sortieren').val()
    }
    console.log(sortTabelle);
})

/*---------------------------------
---------- Ask for ToDo ----------
---------------------------------*/
$(document).ready(function () {
    var editEintrag = {
        typ: 'edit',
        task: $('#task').val(),
        comment: $('#input_textarea').val(),
        option: $('#input_option').val(),
        date: $('#inpute_date').val(),
        prio: $('input[name=prio]:checked').val(),
    }

    console.log(editEintrag);

})


/*---------------------------------
---------- Receive ToDo ----------
---------------------------------*/

var makeList = function () {
    $('#accordion_task').empty();
    $.ajax({
        url: 'http://localhost:5000/zeigetodo',
        method: 'POST',
        success: function (receive_todo) {

            for (var i in receive_todo.todo) {
                $('<div>')
                    .append($('<strong>').html(receive_todo.todo[i].task))
                    .append($('<span>').html('(' + receive_todo.todo[i].comment + '/' + receive_todo.todo[i].prio + ')'))
                    .appendTo('#accordion_task');
            }

        }
    });
}

$(document).ready(function () {
    makeList();

/*------------------ DELETE Start --------------------*/
for (var i = 0; i <= receive_todo.length; i++) {
    // console.log(todo_text);

    (function (i) {
        $('.delete').on('click', function () {
            var that = $(this);
            $('.dialog').modal();

            $('.yes').on('click', function () {
                console.log('hadddddo');
                del_id = $(that).closest('.section').data('id');
                console.log(del_id);
                // $(that).closest('.accordion-toggle_task').css( "background-color", "red" );
                $(that).closest('.section').remove();
                var deleteEintrag = {
                    typ: 'delete',
                    id: del_id
                };

                console.log(deleteEintrag);
                $.modal.close();
            });

            $('.no').on('click', function () {
                $.modal.close();
            });
        });
        /*------------------ DELETE Start --------------------*/


        /*------------------ TODO GENERATE Start --------------------------*/
        var todo_text = `
                <div data-id="${receive_todo[i].id}" class="section">
                    <h4 data-prio="${receive_todo[i].prio}" data-done='${receive_todo[i].done}' class="accordion-toggle_task">
                        <span class="make_task">${receive_todo[i].task}</span>
                        <span class="make_infos">
                            <span class="prio_hide">Priorität: <span class="make_prio">${receive_todo[i].prio}</span></span>

                            <span>Kategorie: </span><span class="make_categories">${receive_todo[i].option}</span>
                
                            <span>Fällig:<span class="make_time">${receive_todo[i].date}</span></span>
                
                        <span class="make_modify">
                
                            <span class="make_edit"><img class="button_img done" src="resources/img/clipboard.svg" alt="done" title="ToDo Done"></span>
                
                            <span class="make_edit"><img class="button_img edit" src="resources/img/inclined-pencil.svg" alt="edit" title="Modify your Task"></span>

                            <span class="make_save"><img class="button_img save prio_hide" src="resources/img/save_black.svg" alt="edit" title="Modify your Task"></span>
                            
                            <span class="make_delete"><img class="button_img delete" src="resources/img/garbage.svg" alt="delete" title="Delete your Task"></span>
                        </span>
                    </span>
                </h4>
                <div class="accordion-content_task">
                <p>${receive_todo[i].comment}</p>
                </div>
                </div>`
        /*------------------ TODO GENERATE Start --------------------------*/


        /*------------------ ACCORDION Start ----------*/
        $('#accordion_task').append(todo_text);

        $('#accordion_task')
            .find('.accordion-toggle_task')
            .click(function () {

                if ($(this).is('.aktiv')) {

                } else {

                    $(".aktiv")
                        .not($(this))
                        .removeClass('aktiv');

                    $(this)
                        .addClass('aktiv')
                        .next()
                        .slideToggle('fast');

                    $(".accordion-content_task")
                        .not($(this).next())
                        .slideUp('fast')
                        .removeClass('aktiv');
                }
            });
        /*------------------ ACCORDION Start ----------*/


        /*------------------ SWIPE Start -------------------*/
        $('section')
            .find('.accordion-toggle_task')
            .on('swipeleft', function () {

                $(this).css("background-color", "gray");

                $(this).next().css({"background-color": "rgb(180, 180, 180)"});
                $(this).attr('data-done', 1).find('.done').remove();
            });


        // $('#accordion_task')
        //     .find('.section')
        //     .on('swipeleft', function () {
        //
        //
        //     });
        /*------------------ SWIPE Start -------------------*/


        /*------------------ PRIO COLOR Start ------------*/
        $('[data-prio="1"]').css({'background': 'green'});
        $('[data-prio="2"]').css({'background': 'greenyellow'});
        $('[data-prio="3"]').css({'background': '#ffff00'});
        $('[data-prio="4"]').css({'background': '#ff8000'});
        $('[data-prio="5"]').css({'background': 'red'});
        $('[data-done="1"]').css({'background': 'gray'});

        if ($('[data-done="1"]')) {
            $('[data-done="1"]').siblings().css({"background-color": "rgb(180, 180, 180)"}).find('.done').remove();
            $('[data-done="1"]').find('.done').remove();
        }
        ;
        /*------------------ PRIO COLOR End ------------*/


        /*------------------ FILTER Start --------------------*/
        $('#prio_choose1').on('click', function () {
            if ($('#prio_choose1').is('input:checked')) {
                $('[data-prio="1"]').parent().removeClass('prio_hide');
            } else {

                $('[data-prio="1"]').parent().addClass('prio_hide');
            }
        });


        $('#prio_choose2').on('click', function () {
            if ($('#prio_choose2').is('input:checked')) {
                $('[data-prio="2"]').parent().removeClass('prio_hide');
            } else {

                $('[data-prio="2"]').parent().addClass('prio_hide');
            }
        });

        $('#prio_choose3').on('click', function () {
            if ($('#prio_choose3').is('input:checked')) {
                $('[data-prio="3"]').parent().removeClass('prio_hide');
            } else {

                $('[data-prio="3"]').parent().addClass('prio_hide');
            }
        });

        $('#prio_choose4').on('click', function () {
            if ($('#prio_choose4').is('input:checked')) {
                $('[data-prio="4"]').parent().removeClass('prio_hide');
            } else {

                $('[data-prio="4"]').parent().addClass('prio_hide');
            }
        });

        $('#prio_choose5').on('click', function () {
            if ($('#prio_choose5').is('input:checked')) {
                $('[data-prio="5"]').parent().removeClass('prio_hide');
            } else {

                $('[data-prio="5"]').parent().addClass('prio_hide');
            }
        });


        $('#prio_chooseDone').on('click', function () {
            if ($('#prio_chooseDone').is('input:checked')) {
                $('[data-done="1"]').parent().removeClass('prio_hide');
            } else {

                $('[data-done="1"]').parent().addClass('prio_hide');
            }
        });
        /*------------------ FILTER End --------------------*/


        /*------------------ MODIFICATION Start ------------*/
        $('#accordion_task')
            .find('.section')
            .on('click', function (event) {

                var target = $(event.target);

                if (target.is('.edit')) {


                    $(this)
                        .find('.make_task')
                        .attr('contenteditable', 'true')
                        .css({'padding': '15px', 'background-color': 'white'});

                    $(this)
                        .find('.prio_hide')
                        .show();

                    $(this)
                        .find('.make_prio')
                        .attr('contenteditable', 'true')
                        .css({'padding': '15px', 'background-color': 'white'});

                    $(this)
                        .find('.make_categories')
                        .attr('contenteditable', 'true')
                        .css({'padding': '15px', 'background-color': 'white'});

                    $(this)
                        .find('.make_time')
                        .attr('contenteditable', 'true')
                        .css({'padding': '15px', 'background-color': 'white'});


                    $(this)
                        .find('.accordion-content_task p')
                        .attr('contenteditable', 'true')
                        .css({'border': '1px solid black', 'padding': '15px', 'background-color': 'white'});

                    $(this)
                        .find('.make_time')
                        .attr('contenteditable', 'true')
                        .css({'padding': '15px', 'background-color': 'white'});


                    $(this)
                        .find('.done')
                        .hide();


                    $(this)
                        .find('.edit').hide();


                    $(this)
                        .find('.delete')
                        .hide();

                }
            });
        /*------------------ MODIFICATION End ------------*/


        /*------------------ SAVE End ------------*/

        $('#accordion_task')
            .find('.section')
            .on('click', function (event) {

                var target = $(event.target);

                if (target.is('.save')) {

                    console.log('save')
                    var modId;
                    var modTask;

                    var tempTime;
                    var tempTimeArray;
                    var htmlString;

                    modId = $(this).data('id');


                    modTask = $(this)
                        .find('.make_task').html();

                    $(this)
                        .find('.make_task')
                        .attr('contenteditable', 'false')
                        .css({'padding': '', 'background-color': ''});


                    $(this)
                        .find('.prio_hide')
                        .hide();


                    var modPrio = $(this)
                        .find('.make_prio')
                        .html();

                    $(this)
                        .find('.make_prio')
                        .attr('contenteditable', 'false')
                        .css({'padding': '', 'background-color': ''});


                    var modKat = $(this)
                        .find('.make_categories')
                        .html();

                    $(this)
                        .find('.make_categories')
                        .attr('contenteditable', 'false')
                        .css({'padding': '', 'background-color': ''});


                    var modTime = $(this)
                        .find('.make_time')
                        .html();

                    $(this)
                        .find('.make_time')
                        .attr('contenteditable', 'false')
                        .css({'padding': '', 'background-color': ''});


                    var modCom = $(this)
                        .find('.accordion-content_task p')
                        .html();

                    $(this)
                        .find('.accordion-content_task p')
                        .attr('contenteditable', 'false')
                        .css({'border': '', 'padding': '', 'background-color': ''});


                    // $(this)
                    //     .find('.make_time')
                    //     .attr('contenteditable', 'true')
                    //     .css({'padding': '15px', 'background-color': 'white'});

                    console.log(modCom);

                    $(this)
                        .find('.done')
                        .show();


                    $(this)
                        .find('.edit').show();


                    $(this)
                        .find('.delete')
                        .show();

                }
            });

        /*------------------ SAVE End ------------*/


        /*------------------ DONE Start ------------*/
        $('#accordion_task')
            .find('.done')
            .on('click', function () {
                $(this)
                    .hide();
                $(this).parent().parent().parent().parent().css("background-color", "gray");
                var doneId = $(this).parent().parent().parent().parent().parent().data('id');
                $(this).parent().parent().parent().parent().next().css({"background-color": "rgb(180, 180, 180)"});
                console.log(doneId);
                $(this).parent().parent().parent().parent().attr('data-done', 1);
            });
        /*------------------ DONE End ------------*/


    }(i));

}

});






