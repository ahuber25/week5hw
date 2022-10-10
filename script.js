$(document).ready(function () {
    var currentDateEl = $("header #currentDay");

    var events = {};

    var hourRendered = moment();

    function renderCalendar(today, events) {

        var rowHr = moment(today).hour(8);
        var calendar = $("div.container");
        calendar.empty();

        for (var i = 1; i < 10; i++) {

            var row = $("<div>").addClass("row");

            var hourClass = "";
            if (today.isBefore(rowHr, "hour")) {
                hourClass = "future"
            } else if (today.isAfter(rowHr, "hour")) {
                hourClass = "past"
            } else {
                hourClass = "present"
            };

            calendar.append(row);
            row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));
            var timeBlock = rowHr.format("hA");
            row.append($("<textarea>").addClass(`col-8 ${hourClass}`).text(events[timeBlock]));
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowHr.format("hA")));

            rowHr.add(1, "hour");

            hourRendered = moment();
        };
    };

    function initCalendar() {
        var today = moment();
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, events);
    };

    function loadCal() {
        var storedCal = JSON.parse(localStorage.getItem("events"));
        if (storedCal) {
            events = storedCal;
        };
    };


    loadCal();
    initCalendar();
    hourTracker();


    function hourTracker() {
        var checkHourInterval = setInterval(function () {
            if (moment().isAfter(hourRendered, "minute")) {
                initCalendar();
            }
        }, 60000);
    };

    function storeCal() {
        localStorage.setItem("events", JSON.stringify(events));
    };

    $(document).on("click", "button.saveBtn", function (event) {
        var calDesc = event.currentTarget.parentElement.children[1].value;
        events[event.currentTarget.id] = calDesc;
        storeCal();
    });

});