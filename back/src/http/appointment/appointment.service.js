const db = require("../database");
const Appointment = db.appointments;

async function findAll() {
  return Appointment.findAll();
}

function findById(id) {
  return Appointment.findByPk(id);
}

function deleteById(id) {
  return Appointment.destroy({ where: { id: id } });
}

async function create(appointment) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (new Date(appointment.date) <= yesterday) {
    throw new Error("You cannot book an appointment in the past");
  }
  const allAppointments = await findAll();
  for (let i = 0; i < allAppointments.length; i++) {
    if (
      allAppointments[i].date === appointment.date &&
      allAppointments[i].type === appointment.type
    ) {
      throw new Error("An appointment has already been booked for this date");
    }
  }
  var newAppointment = new Appointment(appointment);
  return newAppointment.save();
}

function update(appointment, id) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (new Date(appointment.date) <= yesterday) {
    throw new Error("You cannot book an appointment in the past");
  }
  var updateAppointment = {
    date: appointment.date,
    type: appointment.type,
    status: appointment.status,
  };
  return Appointment.update(updateAppointment, { where: { id: id } });
}

async function getCurrentWeekAppointments(weekNumber = 2) {
  const today = new Date();
  const days = [];
  for (let i = 0; i < weekNumber * 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i-1);
    days.push(date.toISOString().split("T")[0]);
  }
  const appointments = await findAll();
  const currentWeekAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentDateWeek = appointmentDate.toISOString().split("T")[0];
    return days.includes(appointmentDateWeek);
  });
  return currentWeekAppointments;
}

const appointmentService = {
  findAll,
  create,
  findById,
  deleteById,
  update,
  getCurrentWeekAppointments,
};

module.exports = appointmentService;
