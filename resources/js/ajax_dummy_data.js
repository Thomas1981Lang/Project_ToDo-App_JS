var del_id;

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
$(document).ready(function () {
    var receive_todo = [
        {
            "id": 0,
            "task": 'versuchtask',
            "comment": "Aliquip ipsum nostrud amet voluptate aute fugiat elit. Irure commodo cupidatat excepteur consequat labore aliqua laborum est anim. Commodo culpa occaecat velit consequat deserunt excepteur irure deserunt minim cillum proident qui deserunt. Consequat commodo voluptate cillum sint voluptate mollit labore aliquip duis reprehenderit. Ex fugiat voluptate aliqua pariatur consequat ex enim anim sit Lorem ea dolore eu officia. Ea culpa irure esse do ex adipisicing duis aliqua occaecat irure. Exercitation eiusmod pariatur et sunt nulla sunt irure irure eiusmod culpa duis anim incididunt.\r\n",
            "option": 0,
            "date": "09.11.2017",
            "prio": 1
        },
        {
            "id": 1,
            "task": 'versuchtaskanderer',
            "comment": "Reprehenderit elit ea exercitation cillum laboris. Ad fugiat eu pariatur consectetur id adipisicing nisi ad velit officia do. Lorem Lorem aliquip laboris ullamco consectetur. Irure culpa consequat nostrud pariatur reprehenderit enim eiusmod laborum. Est esse ut qui consequat Lorem consequat excepteur amet dolore nostrud. Sit laborum ullamco magna id proident reprehenderit pariatur est.\r\n",
            "option": 1,
            "date": "20.02.2018",
            "prio": 2
        },
        {
            "id": 2,
            "task": 'versuchtask3',
            "comment": "Dolor aliqua sint ad ut cillum nisi esse enim in enim cupidatat cupidatat cupidatat. Nostrud et do cupidatat Lorem sint cillum ea fugiat mollit sunt labore. Quis veniam aliqua dolor magna. Reprehenderit tempor duis ipsum anim sit et velit voluptate ullamco minim ea. Enim mollit amet et duis do mollit velit Lorem.\r\n",
            "option": 2,
            "date": "09.11.2017",
            "prio": 2
        },
        {
            "id": 3,
            "task": 'versuchtaskgdf',
            "comment": "Excepteur elit nisi ad aliqua voluptate deserunt minim sint esse officia. Ex enim veniam pariatur anim qui ipsum laborum Lorem et ea. Ullamco labore enim elit Lorem est ex. Aliquip in elit tempor velit minim exercitation ipsum sunt.\r\n",
            "option": 3,
            "date": "24.8.2017",
            "prio": 5
        },
        {
            "id": 4,
            "task": 'versuchtasksdd',
            "comment": "In ea irure do nostrud magna magna ex proident magna. Non mollit nisi laborum consequat. Sit ea pariatur deserunt velit tempor anim incididunt voluptate eiusmod cillum magna cillum mollit. Excepteur reprehenderit veniam et laborum mollit mollit ullamco aliquip aute fugiat. Ex qui enim elit minim veniam mollit proident eiusmod dolore.\r\n",
            "option": 4,
            "date": "01.10.2017",
            "prio": 4,
            "done": 1
        },
        {
            "id": 5,
            "task": 'versuchtask7',
            "comment": "Lorem ut ea elit proident non laborum laboris. Reprehenderit do exercitation nulla ex. Dolore ipsum commodo cupidatat ullamco et pariatur id est quis. Nostrud enim Lorem cillum cupidatat nostrud et.\r\n",
            "option": 5,
            "date": "03.01.2017",
            "prio": 5,
            "done": 0
        },

    ];

    console.log('RECEIVE TODO', receive_todo);


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


})






