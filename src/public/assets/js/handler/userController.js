$("#login").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        url: '/users/auth',
        type: 'POST',
        data: $("#login").serialize(),
        success: (data) => {
            swal(data.title, data.message, data.type).then(() => {
                if (data.type == "success") {
                    window.location.reload();
                }
            });
        }
    });
});

$("#register").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        url: '/users/create',
        type: 'POST',
        data: $("#register").serialize(),
        success: (data) => {
            swal(data.title, data.message, data.type).then(() => {
                if (data.type == "success") {
                    window.location.reload();
                }
            });
        }
    });
});

$("#forgot").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        url: '/users/auth',
        type: 'POST',
        data: $().serialize(),
        success: (data) => {
            swal(data.title, data.message, data.type).then(() => {
                if (data.type == "success") {
                    window.location.reload();
                }
            });
        }
    });
});