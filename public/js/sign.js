document.addEventListener('DOMContentLoaded', function() {
    var elemsBirhtdate = document.querySelector('.birthdayDate');
    var birthdate = M.Datepicker.init(elemsBirhtdate, {format: 'dd/mm/yyyy', autoClose:true, maxDate: new Date()});

    var elemsEventDate = document.querySelector('.eventDatePicker');
    var eventDate = M.Datepicker.init(elemsEventDate, {format: 'dd mmm yyyy', autoClose:true, minDate: new Date()});

    var elemsSelect = document.querySelectorAll('select');
    var select = M.FormSelect.init(elemsSelect, {});

    var elemsTime = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elemsTime, {});

});