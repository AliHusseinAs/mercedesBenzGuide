async function fetchCarDetails(id) {
    try {
        // const apiUrl = `http://localhost:8080/getCar?id=${id}`; // change it for GC Run 
        const apiUrl = `https://mercedes-benz-guide-project-327326864429.me-central1.run.app/getCar?id=${id}`
        console.log(`Fetching data from: ${apiUrl}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch car details: ${response.statusText}`);
        }
        const car = await response.json();
        console.log("Car data fetched:", car);

        populatePopup(car);
        showPopup();
    } catch (error) {
        console.error("Error while fetching car details:", error);
        alert("Failed to load car details. Please try again.");
    }
}

function populatePopup(car) {
    document.getElementById("car-name").textContent = car.name || "N/A";
    document.getElementById("car-variant").textContent = car.variant || "N/A";
    document.getElementById("car-model").textContent = car.model || "N/A";
    document.getElementById("car-engine").textContent = car.engin || "N/A";
    document.getElementById("car-horsepower").textContent = car.hoursePower || "N/A";
    document.getElementById("car-torque").textContent = car.torque || "N/A";
    document.getElementById("car-zeroToOneHundred").textContent = car["0 to 100km time"] || "N/A";
    document.getElementById("car-drivetrain").textContent = car.drivetrain || "N/A";
    document.getElementById("car-topSpeed").textContent = car.top_speed || "N/A";
    document.getElementById("car-trunkCapacity").textContent = car.trunk_capacity || "N/A";
    document.getElementById("car-battery").textContent = car.battery || "N/A";
    document.getElementById("car-range").textContent = car.raneg || "N/A";
    document.getElementById("car-chargingTime").textContent = car.charging_time || "N/A";
    document.getElementById("car-officialSite").href = car.official_site || "#";
}


function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none"; 
    } else {
        console.error("Popup element not found!");
    }
}

function showPopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "flex";
    } else {
        console.error("Popup element not found!");
    }
}
function setupCarImageListeners() {
    const carImages = document.querySelectorAll("img[data-id]"); 
    if (carImages.length === 0) {
        console.warn("No car images with data-id found!");
        return;
    }

    carImages.forEach((img) => {
        img.addEventListener("click", (event) => {
            event.preventDefault(); 
            const carId = img.dataset.id; 
            if (carId) {
                console.log(`Car ID clicked: ${carId}`);
                fetchCarDetails(carId); 
            } else {
                console.warn("No ID found on clicked element.");
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    setupCarImageListeners();
});
