$.ajax({
    url: '/history/card',
    type: "GET",
    success: function (data) {
        $("#history_card").html(data);
    }
}).done(() => {
	$("#table_history").DataTable();
});

$.ajax({
    url: '/history/get_withdraw',
    type: "GET",
    success: function (data) {
        $("#history_withdraw").html(data);
    }
}).done(() => {
	$("#table_withdraw").DataTable();
});

$.ajax({
    url: '/history/get_balance',
    type: "GET",
    success: function (data) {
        $("#history_balace").html(data);
    }
}).done(() => {
    $("#table_balance").DataTable();
});