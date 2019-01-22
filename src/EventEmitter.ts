import EventEmitter from 'eventemitter3'

type EventType =
  // | 'EVENT'
  | 'UPDATE_TIME_SELECTION'

const EE = new EventEmitter<EventType>()

export default EE
