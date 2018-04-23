$(document).ready(function () {


    /*--------------------- New Task Default Datum --------------*/
    document.getElementById('inpute_date').valueAsDate = new Date();


    /*-----------------  Priority Changer------------------------*/
    $('#input_radio_box [type="radio"]').on('change', function () {

        var abfrage = $(this)
            .val();

        switch (abfrage) {
            case '1':
                console.log(abfrage);
                $(this)
                    .prev().addClass('prio_one')
                    .siblings().removeClass('prio_one').removeClass('prio_two').removeClass('prio_three').removeClass('prio_four').removeClass('prio_five');
                break;
            case '2':
                console.log(abfrage);
                $(this)
                    .prev().addClass('prio_two')
                    .siblings().removeClass('prio_one').removeClass('prio_two').removeClass('prio_three').removeClass('prio_four').removeClass('prio_five');
                break;
            case '3':
                console.log(abfrage);
                $(this)
                    .prev().addClass('prio_three')
                    .siblings().removeClass('prio_one').removeClass('prio_two').removeClass('prio_three').removeClass('prio_four').removeClass('prio_five');
                break;
            case '4':
                console.log(abfrage);
                $(this)
                    .prev().addClass('prio_four')
                    .siblings().removeClass('prio_one').removeClass('prio_two').removeClass('prio_three').removeClass('prio_four').removeClass('prio_five');
                break;
            case '5':
                console.log(abfrage);
                $(this)
                    .prev().addClass('prio_five')
                    .siblings().removeClass('prio_one').removeClass('prio_two').removeClass('prio_three').removeClass('prio_four').removeClass('prio_five');
                break;
        } //switch
    }); //change.my_radio_box


    /*------------- Task Accordiion -----------*/


});


/*------------ Confirm Delete ---------*/
//
//
// $('.delete').on('click', function () {
//     $('.dialog').modal();
//
//     $('.yes').on('click', function () {
//
//         console.log(this)
//         $.modal.close();
//     });
//
//     $('.no').on('click', function () {
//         $.modal.close();
//     });
//
//
// });
//

/* TODO: Fix it */

// $('.edit').on('click', function () {
//     console.log('edit')
//     $('accordion_task').attr('contenteditable', true);
//
// });

//
// /*----------     Accordion     ----------*/
// var accordion_fc = function () {
//     $('#accordion_task')
//         .find('.accordion-toggle_task')
//         .click(function () {
//
//             console.log('rrr');
//
//             if ($(this).is('.aktiv')) {
//                 console.log('warum');
//             } else {
//                 console.log($(this).attr('class'));
//                 $(".aktiv")
//                     .not($(this))
//                     .removeClass('aktiv');
//
//                 $(this)
//                     .addClass('aktiv')
//                     .next()
//                     .slideToggle('fast');
//
//                 $(".accordion-content_task")
//                     .not($(this).next())
//                     .slideUp('fast')
//                     .removeClass('aktiv');
//             }
//         });
// }