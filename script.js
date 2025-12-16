AOS.init({
  duration: 1000,
  once: true
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: 450,
    selectable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: ""
    },
    dateClick: function(info) {
      alert("Selected Date: " + info.dateStr + "\nInquiry will be sent.");
    }
  });

  calendar.render();
});
function calculatePrice() {
  const from = document.getElementById("fromCity").value;
  const to = document.getElementById("toCity").value;
  const vehicle = document.getElementById("vehicleType").value;
  const date = document.getElementById("travelDate").value;

  if (!from || !to || !vehicle || !date) {
    alert("Please fill all booking details");
    return;
  }

  if (from === to) {
    alert("From and To cannot be the same");
    return;
  }

  // Route distances (can be expanded anytime)
  const distances = {
    "Vadodara-Surat": 150,
    "Surat-Vadodara": 150,
    "Vadodara-Ahmedabad": 110,
    "Ahmedabad-Vadodara": 110,
    "Ahmedabad-Surat": 265,
    "Surat-Ahmedabad": 265
  };

  const routeKey = `${from}-${to}`;
  const distanceKM = distances[routeKey];

  if (!distanceKM) {
    alert("Route not available yet");
    return;
  }

  // Price per KM
  const rates = {
    sedan: 12,
    suv: 15,
    innova: 18,
    tempo: 25,
    luxury: 30
  };

  const price = distanceKM * rates[vehicle];

  document.getElementById("km").innerText = distanceKM;
  document.getElementById("price").innerText = price.toLocaleString();

  document.getElementById("estimateResult").classList.remove("hidden");
}
function switchTab(type) {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active-tab"));

  event.target.classList.add("active-tab");

  const form = document.getElementById("bookingForm");

  if (type === "round") {
    form.innerHTML = `
      <input type="text" placeholder="Pickup Location" class="form-input">
      <input type="text" placeholder="Drop Location" class="form-input">

      <div class="grid grid-cols-2 gap-4">
        <input type="date" class="form-input">
        <input type="time" class="form-input">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <input type="date" class="form-input">
        <input type="time" class="form-input">
      </div>

      <input type="tel" placeholder="Mobile Number" class="form-input">

      <button class="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">
        Check Rates
      </button>
    `;
  }

  if (type === "oneway") {
    form.innerHTML = `
      <input type="text" placeholder="Pickup Location" class="form-input">
      <input type="text" placeholder="Drop Location" class="form-input">

      <div class="grid grid-cols-2 gap-4">
        <input type="date" class="form-input">
        <input type="time" class="form-input">
      </div>

      <input type="tel" placeholder="Mobile Number" class="form-input">

      <button class="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">
        Check One Way Rates
      </button>
    `;
  }

  if (type === "local") {
    form.innerHTML = `
      <input type="text" placeholder="City" class="form-input">

      <div class="grid grid-cols-2 gap-4">
        <input type="date" class="form-input">
        <input type="time" class="form-input">
      </div>

      <input type="tel" placeholder="Mobile Number" class="form-input">

      <button class="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">
        Check Local Packages
      </button>
    `;
  }
}
