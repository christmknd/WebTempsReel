const appointmentService = require("../src/http/appointment/appointment.service");

async function getFreeSLots() {
  let currentWeekAppointments =
    await appointmentService.getCurrentWeekAppointments(1);
  let freeSlots = {
    "Tout-Terrain": getNextWeekDays(1),
    Sportif: getNextWeekDays(1),
    Routier: getNextWeekDays(1),
    Entretien: getNextWeekDays(1),
  };
  freeSlots = removeTakenSlots(currentWeekAppointments, freeSlots);
  let emptySlots = false;
  // console.log(freeSlots)
  Object.keys(freeSlots).forEach((key) => {
    if (freeSlots[key].length === 0) {
      emptySlots = true;
      freeSlots[key] = getNextWeekDays(2);
    }
  });
  if (emptySlots) {
    console.log("there is empty slot for current week")
    currentWeekAppointments =
      await appointmentService.getCurrentWeekAppointments(2);
    freeSlots = removeTakenSlots(currentWeekAppointments, freeSlots);
  }
  return freeSlots;
}

function getNextWeekDays(weekNumber = 2) {
  const today = new Date();
  const days = [];
  for (let i = 0; i < weekNumber * 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i-1);
    days.push(date.toISOString().split("T")[0]);
  }
  days.splice(0, (weekNumber-1) * 7);
  return days;
}

function removeTakenSlots(appointments, freeSlots) {
  appointments.forEach((appointment) => {
    // console.log(appointment)
    if (appointment.status !== "Annulé") {
      const index = freeSlots[appointment.type].indexOf(appointment.date);
      if (index > -1) {
        freeSlots[appointment.type].splice(index, 1);
      }
    }
  });
  return freeSlots;
}

module.exports = {
  getFreeSLots,
};
