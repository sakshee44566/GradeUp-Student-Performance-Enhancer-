document.addEventListener("DOMContentLoaded", function () {
  const times = [
    "7-8 am",
    "8-9 am",
    "9-10 am",
    "10-11 am",
    "11-12 noon",
    "12-1 pm",
    "1-2 pm",
    "2-3 pm",
    "3-4 pm",
    "4-5 pm",
    "5-6 pm",
    "6-7 pm",
    "7-8 pm",
    "8-9 pm",
    "9-10 pm",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const table = document.getElementById("timetable");

  let headerRow = "<tr><th>Time / Day</th>";
  days.forEach((day) => (headerRow += `<th>${day}</th>`));
  headerRow += "</tr>";
  table.innerHTML += headerRow;

  times.forEach((time) => {
    let row = `<tr><td>${time}</td>`;
    days.forEach((day) => {
      row += `<td><select name="${day}_${time}" class="dropdown">
                        <option value="free">Free</option>
                        <option value="class">Class</option>
                        <option value="meal">Meal</option>
                        <option value="other">Other</option>
                    </select></td>`;
    });
    row += "</tr>";
    table.innerHTML += row;
  });
});

/*
function submitSchedule() {
    const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
    fetch('/submit-schedule', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const messages = document.getElementById('messages');
        messages.innerHTML = '';
        data.availableSlots.forEach(slot => {
            messages.innerHTML += `<p>${slot} this slot is available.</p>`;
        });
    })
    .catch(error => console.error('Error:', error));
}
*/

function submitSchedule() {
  const scheduleData = {};

  const tableRows = document.querySelectorAll("#timetable tr");
  for (let i = 1; i < tableRows.length; i++) {
    const timeInterval = tableRows[i].cells[0].textContent.trim();
    const dayData = {};
    const dropdowns = tableRows[i].querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown, index) => {
      const selectedOption = dropdown.value;
      const dayOfWeek = document
        .querySelector(
          "#timetable tr:nth-child(1) th:nth-child(" + (index + 2) + ")"
        )
        .textContent.trim();
      dayData[dayOfWeek] = selectedOption;
    });
    scheduleData[timeInterval] = dayData;
  }

  const studyHours = parseInt(document.getElementById("studyHours").value) || 0;
  const extracurricularHours =
    parseInt(document.getElementById("extracurricularHours").value) || 0;
  const technicalSkillsHours =
    parseInt(document.getElementById("technicalSkillsHours").value) || 0;

  let freeTime = 0;
  let inClassTime = 0;
  let otherTime = 0;
  for (const timeInterval in scheduleData) {
    const dayData = scheduleData[timeInterval];
    for (const dayOfWeek in dayData) {
      if (dayData[dayOfWeek] === "free") {
        freeTime++;
      } else if (dayData[dayOfWeek] === "class") {
        inClassTime++;
      } else if (dayData[dayOfWeek] === "other") {
        otherTime++;
      }
    }
  }

  const userTarget =
    (studyHours + extracurricularHours + technicalSkillsHours) * 7;

  //   const freeTimeOutput = document.getElementById("freeTimeOutput");
  //   freeTimeOutput.textContent = `Free Time: ${freeTime} hours`;

  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modalMessage");
  const span = document.getElementsByClassName("close")[0];

  let userOutput = "";

  if (userTarget < freeTime) {
    userOutput = "More free slots available! You need to work more!";
  } else if (userTarget === freeTime) {
    userOutput = "Hurray! You are on the right track! Keep Going!";
  } else {
    userOutput = "Less free slots available. Change your study plan!";
  }

  let freeTimeLeft = freeTime - userTarget;
  if (freeTimeLeft < 0) {
    freeTimeLeft = 0;
  }

  //   modalMessage1.textContent = `${userOutput}\r
  //   Total Free Time Available: ${freeTime} hours
  //   \nFree Time Left: ${freeTimeLeft} hours
  //   \nFree Time Utilized: ${Math.min(freeTime, userTarget)} hours
  //   \n In class Time: ${inClassTime}
  //   \n Other activities Time: ${otherTime}`;
  modalMessage1.textContent = `${userOutput}`;
  modalMessage2.textContent = `Total Free Time Available: ${freeTime} hours`;
  modalMessage3.textContent = `Free Time Left: ${freeTimeLeft} hours`;
  modalMessage4.textContent = `User Target: ${userTarget} hours`;
  modalMessage5.textContent = `In class Time: ${inClassTime}`;
  modalMessage6.textContent = `Other activities Time: ${otherTime}`;

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //   if (userTarget < freeTime) {
  //     alert("More free time available!");
  //   } else if (userTarget === freeTime) {
  //     alert("On the right track!");
  //   } else {
  //     alert("Look for free slots!");
  //   }

  const submitButton = document.getElementById("submitButton");
  //   submitButton.addEventListener("click", submitSchedule);
  //   const freeTimeOutput = document.getElementById("freeTimeOutput");
  //   freeTimeOutput.textContent = `Free Time: ${freeTime} hours`;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  // Display results
  // const table = document.getElementById("timetable");
  // const clone= document.getElementById("clone");
  // const rows = table.rows;
  // const user_input_data = [];

  // // Iterate through table rows to collect user input
  // for (let i = 1; i < rows.length; i++) {
  //   const rowData = [];
  //   const cells = rows[i].cells;

  //   for (let j = 1; j < cells.length; j++) {
  //     const selectElement = cells[j].querySelector("select");
  //     const selectedOption = selectElement.value;
  //     rowData.push(selectedOption);
  //   }
  //   user_input_data.push(rowData);
  // }

  // // Display updated table with selected options
  // const clonedTable = table.cloneNode(true);
  // const rowsOutput = clonedTable.getElementsByTagName("tr");
  // for (let i = 1; i < rowsOutput.length; i++) {
  //   const cells = rowsOutput[i].getElementsByTagName("td");
  //   for (let j = 1; j < cells.length; j++) {
  //     const selectElement = cells[j].querySelector("select");
  //     const selectedOption = user_input_data[i - 1][j - 1];
  //     cells[j].textContent = selectedOption;
  //     cells[j].className = selectedOption; // Apply class for styling
  //   }
  // }
  // const form = document.getElementById("scheduleForm");
  // // Replace table with updated version
  // clone.appendChild(clonedTable);
}
// Function to display the home page and hide the timetable
function showHome() {
  window.location.reload();
  document.getElementById("scheduleForm").style.display = "block";
  document.getElementById("clone").style.display = "none";
}



// Function to display the timetable page and hide the home page

function showTimetable() {
  document.getElementById("scheduleForm").style.display = "none";
  document.getElementById("clone").style.display = "block";
  document.getElementById("userInput").style.display = "none";
  document.getElementById("home_tab").style.display = "none";
  document.getElementById("contactUs").style.display = "none";
  // Display results
  const table = document.getElementById("timetable");
  const clone = document.getElementById("clone");
  const rows = table.rows;
  const user_input_data = [];

  // Iterate through table rows to collect user input
  for (let i = 1; i < rows.length; i++) {
    const rowData = [];
    const cells = rows[i].cells;

    for (let j = 1; j < cells.length; j++) {
      const selectElement = cells[j].querySelector("select");
      const selectedOption = selectElement.value;
      rowData.push(selectedOption);
    }
    user_input_data.push(rowData);
  }

  // Display updated table with selected options
  const clonedTable = table.cloneNode(true);
  const rowsOutput = clonedTable.getElementsByTagName("tr");
  for (let i = 1; i < rowsOutput.length; i++) {
    const cells = rowsOutput[i].getElementsByTagName("td");
    for (let j = 1; j < cells.length; j++) {
      const selectElement = cells[j].querySelector("select");
      const selectedOption = user_input_data[i - 1][j - 1];
      cells[j].textContent = selectedOption;
      cells[j].className = selectedOption; // Apply class for styling
    }
  }
  const form = document.getElementById("scheduleForm");
  // Replace table with updated version
  clone.appendChild(clonedTable);
}

function showContact(){
  document.getElementById("scheduleForm").style.display = "none";
  document.getElementById("clone").style.display = "none";
  document.getElementById("userInput").style.display = "none";
  document.getElementById("contactUs").style.display = "block";
  document.getElementById("home_tab").style.display = "none";
  // Assuming there's a <div> element with id="contactInfo" to display the contact information
  const contactContainer = document.getElementById("contactUs");

  // Example contact information
  const email = 'GradeUp44@gmail.com';
  const phoneNumber = '+91-22831210';

  // Create elements to display the contact information
  const emailElement = document.createElement('p');
  emailElement.textContent = 'Email: ' + email;

  const phoneElement = document.createElement('p');
  phoneElement.textContent = 'Phone: ' + phoneNumber;

  // Append the contact elements to the container
  contactContainer.appendChild(emailElement);
  contactContainer.appendChild(phoneElement);
}
// Initialize dropdowns when the page loads
// window.addEventListener("DOMContentLoaded", initializeDropdowns);
