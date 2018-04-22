var that;

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
    var ask_todo = {
        typ: 'abfrage',
        sort: $('#sortieren').val()
    }
    console.log('1', ask_todo);

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
            "prio": 0
        },
        {
            "id": 1,
            "task": 'versuchtaskanderer',
            "comment": "Reprehenderit elit ea exercitation cillum laboris. Ad fugiat eu pariatur consectetur id adipisicing nisi ad velit officia do. Lorem Lorem aliquip laboris ullamco consectetur. Irure culpa consequat nostrud pariatur reprehenderit enim eiusmod laborum. Est esse ut qui consequat Lorem consequat excepteur amet dolore nostrud. Sit laborum ullamco magna id proident reprehenderit pariatur est.\r\n",
            "option": 1,
            "date": "20.02.2018",
            "prio": 1
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
            "prio": 3
        },
        {
            "id": 4,
            "task": 'versuchtasksdd',
            "comment": "In ea irure do nostrud magna magna ex proident magna. Non mollit nisi laborum consequat. Sit ea pariatur deserunt velit tempor anim incididunt voluptate eiusmod cillum magna cillum mollit. Excepteur reprehenderit veniam et laborum mollit mollit ullamco aliquip aute fugiat. Ex qui enim elit minim veniam mollit proident eiusmod dolore.\r\n",
            "option": 4,
            "date": "01.10.2017",
            "prio": 4
        },
        {
            "id": 7,
            "task": 'versuchtask7',
            "comment": "Lorem ut ea elit proident non laborum laboris. Reprehenderit do exercitation nulla ex. Dolore ipsum commodo cupidatat ullamco et pariatur id est quis. Nostrud enim Lorem cillum cupidatat nostrud et.\r\n",
            "option": 5,
            "date": "03.01.2017",
            "prio": 5
        },
        {
            "id": 6,
            "task": 'blabal',
            "comment": "Id excepteur dolore exercitation velit amet cupidatat sit dolore laborum. Et eu id labore aliqua proident proident officia eu. Anim Lorem deserunt ea sunt pariatur nisi cupidatat. Fugiat ea ullamco ullamco nostrud consequat aliqua est eu in adipisicing aute tempor reprehenderit.\r\n",
            "option": 6,
            "date": "09.12.2017",
            "prio": 6
        }
    ];

    console.log('2', receive_todo);


    var i;
var x = 0;

    for (i in receive_todo) {

        console.log(x);



        // console.log(todo_text);
        (function(i) { // iife um Wert anzuheften

            var todo_text = `
                <h4 class="accordion-toggle_task">
                <span class="make_task">${receive_todo[i].task}</span>
                <span class="make_infos">
                <span>Kategorie: </span><span class="make_categories">${receive_todo[i].option}</span>
                <span>Fällig:<span class="make_time">${receive_todo[i].date}</span></span>
                <span class="make_modify">
                <span class="make_edit">
                <img class="button_img edit" src="resources/img/inclined-pencil.svg" alt="edit" title="Modify your Task">
                </span>
                <span class="make_delete">
                <img class="button_img delete" src="resources/img/garbage.svg" alt="delete" title="Delete your Task">
                </span>
                </span>
                </span>
                </h4>
                <div class="accordion-content_task">
                <p>${receive_todo[i].comment}</p>
                </div>`

            var that = $(this);
        $('#accordion_task').append(todo_text);
            x++;
            console.log(x);
        }(i));

    }
})
