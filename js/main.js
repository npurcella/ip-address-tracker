document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map", { zoomControl: false }).fitWorld()

    map.locate({ setView: true, maxZoom: 16 })

    function onLocationFound(e) {
        var myIcon = L.icon({
            iconUrl: "../images/icon-location.svg",
            iconSize: [35, 40],
        })

        L.marker(e.latlng, { icon: myIcon }).addTo(map)
    }

    map.on("locationfound", onLocationFound)

    function onLocationError(e) {
        alert(e.message)
    }

    map.on("locationerror", onLocationError)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
        map
    )

    ////////////////////////////////////////
    const searchClick = document.querySelector(".submit-btn")

    searchClick.addEventListener("click", function (event) {
        event.preventDefault()
        const userInput = document.querySelector(".ip-input")

        let validIP = ValidateIPaddress(userInput.value)

        if (validIP) {
            // alert("VALID", userInput.value)
            fetch(
                "https://geo.ipify.org/api/v1?apiKey=at_BbxxERR06agQ9XzJK1zLpweo9dPKR&ipAddress=72.222.177.193"
            )
                .then((response) => {
                    return response.json()
                })
                .then((ipData) => {
                    populateResults(ipData)
                })
        } else {
            // alert("NOT VALID!") // maybe add an error class
            userInput.classList.add("error")
        }
    })

    function populateResults(ipData) {
        // const ipResultArea = document.querySelector(".current-ip-results")
        // ipResultArea.style.display = "inline-block"

        const ipAddress = document.querySelector("#ip-address")
        ipAddress.innerHTML = ipData.ip

        const location = document.querySelector("#location")
        location.innerHTML =
            ipData.location.city +
            ", " +
            ipData.location.region +
            " " +
            ipData.location.postalCode

        const timezone = document.querySelector("#timezone")
        timezone.innerHTML = "UTC " + ipData.location.timezone

        const isp = document.querySelector("#isp")
        isp.innerHTML = ipData.isp
    }

    // Validate IP address
    function ValidateIPaddress(ipaddress) {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ipaddress
            )
        ) {
            return true
        }
        return false
    }
})
