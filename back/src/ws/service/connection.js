const OnConnection = function OnConnection(socket) {
    console.log('user connected');
  }

  const fnWS = { OnConnection }

  module.exports = fnWS