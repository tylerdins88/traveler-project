fetchBtn = $("#fetchBtn");

function findHotel(event) {
    event.preventDefault();

    var hotelLoc = $("#hotelLoc").val();

    var hotelAPI = "ENTER API LINK HERE"

    fetch(hotelAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            hotelData = data;
        })
}

fetchBtn.on("click", findHotel);
