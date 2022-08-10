$("#card").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        url: '/postCard',
        type: "POST",
        data: $("#card").serialize(),
        success: function (data) {
            swal(data.title, data.message, data.type).then(() => {
                if (data.type == "success") {
                    window.location.reload();
                }
            });
        }
    });
});
