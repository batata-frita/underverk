const data = {
  sources: [
    { type: 'state', name: 'value' },
    { type: 'event', name: 'onChange' },
  ],

  sinks: [
    { type: 'state', name: 'setValue' },
    { type: 'effect', name: 'log' },
  ],

  structure: [],
}

export default () => {}
