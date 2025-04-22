const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit-schedule", (req, res) => {
  const schedule = req.body;
  console.log(schedule); // Debug: Check the schedule data
  let availableSlots = [];

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

  // Process each day and time slot
  days.forEach((day) => {
    times.forEach((time) => {
      // Construct the form field name as used in the frontend
      const slotName = `${day}_${time}`;
      if (schedule[slotName] === "free") {
        availableSlots.push(`${day} ${time}`);
      }
    });
  });
  res.json({ availableSlots });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
