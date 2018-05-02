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

