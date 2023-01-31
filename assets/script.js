fetchBtn = $("#fetchBtn");

//creates event listener on fetch button
fetchBtn.on("click", handleSubmit);

var breweryInfo = $("#brewerySlot")
var hotelInfo = $("#hotelSlot")

//creates function to retrieve data after clicking button
function handleSubmit(event) {
    event.preventDefault();
   
    var breweryLoc = $("#breweryLoc").val();
    console.log("message", breweryLoc)
    var breweryKey = '2b148a14a3msh12fa6ec54fe1b3fp1ed456jsnbd039561a19d'
    var breweryAPI = "https://breweries.p.rapidapi.com/search.php?name=brew&postal=" + breweryLoc

    var options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2b148a14a3msh12fa6ec54fe1b3fp1ed456jsnbd039561a19d',
            'X-RapidAPI-Host': 'breweries.p.rapidapi.com'
        }
    }

    //fetches data from brewery API
    fetch(breweryAPI, options1)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            breweryData = data;

            var breweryName = data[0].name 
            var breweryAddress = data[0].address
            console.log(breweryName, breweryAddress)
            
            //renders brewery info on website
            var breweryDiv1 = $("<div>")
            breweryInfo.append(breweryDiv1)
            breweryDiv1.text("Brewery Name: " + breweryName)

            var breweryDiv2 = $("<div>")
            breweryInfo.append(breweryDiv2)
            breweryDiv2.text("Brewery Addres: " + breweryAddress)

            var lon = data[0].longitude
            console.log(lon)
            var lat = data[0].latitude
            console.log(lat)

            var hotelKey = "0c79cccc48mshc9a18d77fd1168bp1de8d6jsncab9da17bdfa"
            var hotelAPI = "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=" + lon + "&filter_by_currency=USD&room_number=1&locale=en-us&latitude=" + lat + "&order_by=popularity&units=imperial&checkin_date=2023-07-15&adults_number=2&checkout_date=2023-07-16&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_number=2&include_adjacency=true&children_ages=5%2C0"

            var options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '0c79cccc48mshc9a18d77fd1168bp1de8d6jsncab9da17bdfa',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            }

            //fetches data from hotel API
            fetch(hotelAPI, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    hotelData = data;

                    console.log(data.result[0].distance);
                    
                    
                    //limits the distance between the hotel and the brewery 

                    var k = 0;
            
                    for (i=0;i<data.result.length;i++){
                        var distanceHotel = data.result[i].distance;
                        if (Number(distanceHotel) <= 1){
                            k = i;
                            console.log(k);
                            break;
                            
                        }
                    }


                    var hotelName = data.result[k].hotel_name;
                    var hotelAddress = data.result[k].address;
                   

                    console.log(hotelName, hotelAddress)

                    //renders hotel info onto website
                    var hotelDiv1 = $("<div>")
                    hotelInfo.append(hotelDiv1)
                    hotelDiv1.text("Hotel Name: " + hotelName)

                    var hotelDiv2 = $("<div>")
                    hotelInfo.append(hotelDiv2)
                    hotelDiv2.text("Hotel Address: " + hotelAddress)

                    
                    
                })

                

        })

}
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
// pull address of hotel from data
//display name and info of hotel 
// using address of the hotel, we will find the nearest restaurant
    //nearest restaurant would be chosen based off of the user's food preference
// fetch for restaurant API
// pull address of restraunt from data
// display info on our website