// BREWERY API 

// https://rapidapi.com/ExoWatts/api/breweries/

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '2b148a14a3msh12fa6ec54fe1b3fp1ed456jsnbd039561a19d',
// 		'X-RapidAPI-Host': 'breweries.p.rapidapi.com'
// 	}
// };

// fetch('https://breweries.p.rapidapi.com/search.php?name=brew&state=North%20Dakota&postal=58102', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


//HOTEL API

// https://rapidapi.com/tipsters/api/booking-com/

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0c79cccc48mshc9a18d77fd1168bp1de8d6jsncab9da17bdfa',
// 		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
// 	}
// };

// fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=-18.5333&filter_by_currency=USD&room_number=1&locale=en-us&latitude=65.9667&order_by=popularity&units=imperial&checkin_date=2023-07-15&adults_number=2&checkout_date=2023-07-16&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_number=2&include_adjacency=true&children_ages=5%2C0', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// click on button to submit zip code//
fetchBtn = $("#fetchBtn");

function findHotel(event) {
    event.preventDefault();

    // var hotelLoc = $("#hotelLoc").val();

    // var hotelAPI = "ENTER API LINK HERE"

    // fetch(hotelAPI)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //         hotelData = data;
    //     })

fetchBtn.on("click", findHotel);
// pull address of hotel from data
//display name and info of hotel 
// using address of the hotel, we will find the nearest restaurant
    //nearest restaurant would be chosen based off of the user's food preference
// fetch for restaurant API
// pull address of restraunt from data
// display info on our website 

// hello 
