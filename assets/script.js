// click on button to submit zip code//
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
// pull address of hotel from data 
//display name and info of hotel 
// using address of the hotel, we will find the nearest restaurant
    //nearest restaurant would be chosen based off of the user's food preference
// fetch for restaurant API
// pull address of restraunt from data
// display info on our website 