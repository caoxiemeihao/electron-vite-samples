// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { SerialPort } from 'serialport'

async function listSerialPorts() {
  const ports = await SerialPort.list()

  if (ports.length === 0) {
    console.warn('No ports discovered')
  } else {
    console.log('ports', ports)
  }
}

function listPorts() {
  listSerialPorts()
  setTimeout(listPorts, 2000)
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000)

listSerialPorts()
