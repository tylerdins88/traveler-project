fetchBtn = $("#fetchBtn");

//creates event listener on fetch button
fetchBtn.on("click", handleSubmit);

var breweryInfo = $("#brewerySlot")
var hotelInfo = $("#hotelSlot")
var prevLoc = $("#prevLoc")
var breweryData;
var lat;
var lon;

//creates function to retrieve data after clicking button
function handleSubmit(event) {
    event.preventDefault();

    var breweryLoc = $("#breweryLoc").val();
    console.log("message", breweryLoc)

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

            lon = data[0].longitude
            console.log(lon)
            lat = data[0].latitude
            console.log(lat)

            updateBrewery();

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

                    for (i = 0; i < data.result.length; i++) {
                        var distanceHotel = data.result[i].distance;
                        if (Number(distanceHotel) <= 1) {
                            k = i;
                            console.log(k);
                            break;

                        }
                    }

                    hotelInfo.empty();


                    var hotelName = data.result[k].hotel_name;
                    var hotelAddress = data.result[k].address;
                    var hotelURL = data.result[k].url
                    console.log(hotelName, hotelAddress, hotelURL)

                    //renders hotel info onto website
                    var hotelDiv1 = $("<div>")
                    hotelInfo.append(hotelDiv1)
                    hotelDiv1.text("Hotel Name: " + hotelName)

                    var hotelDiv2 = $("<div>")
                    hotelInfo.append(hotelDiv2)
                    hotelDiv2.text("Hotel Address: " + hotelAddress)

                    var hotelDiv3 = $("<a>")
                    hotelInfo.append(hotelDiv3)
                    hotelDiv3.attr("href", hotelURL)
                    hotelDiv3.attr("target", "_blank")
                    hotelDiv3.text("Book a Room Here")

                    createList();
                })



        })

}

function updateBrewery() {
    breweryInfo.empty();

    var breweryName = breweryData[0].name
    var breweryAddress = breweryData[0].address
    var breweryWebsite = breweryData[0].website_url
    console.log(breweryName, breweryAddress, breweryWebsite)

    //renders brewery info on website
    var breweryDiv1 = $("<div>")
    breweryInfo.append(breweryDiv1)
    breweryDiv1.text("Brewery Name: " + breweryName)

    var breweryDiv2 = $("<div>")
    breweryInfo.append(breweryDiv2)
    breweryDiv2.text("Brewery Addres: " + breweryAddress)

    var breweryDiv3 = $("<a>")
    breweryInfo.append(breweryDiv3)
    breweryDiv3.attr("href", breweryWebsite)
    breweryDiv3.attr("target", "_blank")
    breweryDiv3.text("Brewery Website")
}

function createList() {
    enteredLoc = $("#breweryLoc").val()

    var lastEntered = document.createElement("li");
    var lastInfo = document.createElement("button");
    lastInfo.innerHTML = enteredLoc;
    lastInfo.setAttribute("class", "listLoc")
    // lastInfo.addEventListener("click", grabStorage);
    lastEntered.append(lastInfo)
    prevLoc.append(lastEntered)
}


// click on button to submit zip code//
// pull address of hotel from data
//display name and info of hotel 
// using address of the hotel, we will find the nearest restaurant
    //nearest restaurant would be chosen based off of the user's food preference
// fetch for restaurant API
// pull address of restraunt from data
// display info on our website