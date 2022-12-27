const appointmentService = require("./appointment.service");

function create(req, res) {
  let appointment = req.body;
  appointmentService
    .create(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}

function findAppointmentById(req, res) {
  console.log("findAppointmentById");
  appointmentService
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}

function deleteById(req, res) {
  console.log("deleteById");
  appointmentService
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "Appointment deleted successfully",
        appointment: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}

function updateAppointment(req, res) {
  console.log("updateAppointment");
  appointmentService
    .update(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "Appointment updated successfully",
        appointment: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}

function findAppointments(req, res) {
  console.log("findAppointments");
  appointmentService
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}

const appointmentController = {
  create,
  findAppointmentById,
  deleteById,
  updateAppointment,
  findAppointments,
};

module.exports = appointmentController;
