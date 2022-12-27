const express = require('express');
const appointmentRouter = express.Router();

const appointmentController = require("./appointment.controller");

appointmentRouter.post('/', appointmentController.create);
appointmentRouter.get('/', appointmentController.findAppointments);
appointmentRouter.get('/:id', appointmentController.findAppointmentById);
appointmentRouter.put('/:id', appointmentController.updateAppointment);
appointmentRouter.delete('/:id', appointmentController.deleteById);

module.exports = appointmentRouter;

