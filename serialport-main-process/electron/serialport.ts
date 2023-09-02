import { SerialPort } from 'serialport'

export function listSerialPorts() {
  return SerialPort.list()
}
