// This access the fetch button on the html and gives it a event listener of a click. 
fetchBtn = $("#fetchBtn");
fetchBtn.on("click", handleSubmit);

// These are variables we use globablly throughout the appplication. 
var breweryInfo = $("#brewerySlot")
var hotelInfo = $("#hotelSlot")
var prevLoc = $("#prevLoc")
var breweryData;
var hotelData;
var lat;
var lon;
var storedLocations = JSON.parse(localStorage.getItem("locationWanted")) || [];

// Creates function to retrieve data after clicking the fetch button
function handleSubmit(event) {
    event.preventDefault();

    var breweryLoc = $("#breweryLoc").val();
    console.log("message", breweryLoc)
    retrieveDataZip(breweryLoc);
}


// Once the fetch brewery button is clicked it will run this function next with the entered value. 
function retrieveDataZip(breweryLoc) {
    var breweryAPI = "https://breweries.p.rapidapi.com/search.php?name=brew&postal=" + breweryLoc
    var options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2b148a14a3msh12fa6ec54fe1b3fp1ed456jsnbd039561a19d',
            'X-RapidAPI-Host': 'breweries.p.rapidapi.com'
        }
    }

    // Fetches data from brewery API
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

            // Lists the brewery and hotel if found
            updateBrewery();
            updateHotel();
            if (storedLocations.includes(breweryLoc)) {
                return;
            } else {
                createList();
                storedLocations.push(breweryLoc)
                localStorage.setItem("locationWanted", JSON.stringify(storedLocations))
            }
        })
}

// Function that lists the brewery information
function updateBrewery() {
    breweryInfo.empty();

    var breweryName = breweryData[0].name
    var breweryAddress = breweryData[0].address
    var breweryWebsite = breweryData[0].website_url
    console.log(breweryName, breweryAddress, breweryWebsite)

    var breweryDiv1 = $("<div>")
    breweryInfo.append(breweryDiv1)
    breweryDiv1.text("Brewery Name: " + breweryName)

    var breweryDiv2 = $("<div>")
    breweryInfo.append(breweryDiv2)
    breweryDiv2.text("Brewery Address: " + breweryAddress)

    var breweryDiv3 = $("<a>")
    breweryInfo.append(breweryDiv3)
    breweryDiv3.attr("href", breweryWebsite)
    breweryDiv3.attr("target", "_blank")
    breweryDiv3.text("Brewery Website")
}

// Function that fetches the hotel data and lists it on the page
function updateHotel() {
    var hotelAPI = "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=" + lon + "&filter_by_currency=USD&room_number=1&locale=en-us&latitude=" + lat + "&order_by=popularity&units=imperial&checkin_date=2023-07-15&adults_number=2&checkout_date=2023-07-16&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_number=2&include_adjacency=true&children_ages=5%2C0"
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c79cccc48mshc9a18d77fd1168bp1de8d6jsncab9da17bdfa',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    }

    // Fetches data from hotel API here
    fetch(hotelAPI, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            hotelData = data;

            console.log(hotelData.result[0].distance);

            // Limits the distance between the hotel and the brewery 
            var k = 0;

            for (i = 0; i < hotelData.result.length; i++) {
                var distanceHotel = hotelData.result[i].distance;
                if (Number(distanceHotel) <= 1) {
                    k = i;
                    console.log(k);
                    break;

                }
            }

            hotelInfo.empty();

            var hotelName = hotelData.result[k].hotel_name;
            var hotelAddress = hotelData.result[k].address;
            var hotelURL = hotelData.result[k].url
            console.log(hotelName, hotelAddress, hotelURL)

            // Renders hotel info onto website
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
        })
}

// This renders previous searches on the page using Local Storage
function renderPrevList() {
    for (var i = 0; i < storedLocations.length; i++) {
        var lastEntered = document.createElement("li");
        var lastInfo = document.createElement("button");
        var enteredLoc = storedLocations[i];

        lastInfo.innerHTML = enteredLoc;
        lastInfo.setAttribute("class", "listLoc")
        lastInfo.addEventListener("click", grabStorage);
        lastEntered.append(lastInfo)
        prevLoc.append(lastEntered)
    }
}

// This creates the list buttons as the user searches various zip codes
function createList() {
    var enteredLoc = $("#breweryLoc").val()
    var lastEntered = document.createElement("li");
    var lastInfo = document.createElement("button");

    lastInfo.innerHTML = enteredLoc;
    lastInfo.setAttribute("class", "listLoc")
    lastInfo.addEventListener("click", grabStorage);
    lastEntered.append(lastInfo)
    prevLoc.append(lastEntered)
}

// Here is where we get our Local Storage information to access the previous searches.
function grabStorage(event) {
    var keyWanted = event.target.textContent;
    console.log(keyWanted)
    retrieveDataZip(keyWanted);
}

// Calls the renderPrevList function to display previous searches when page loads
renderPrevList();