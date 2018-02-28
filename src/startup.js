import Pace from 'pace-progress'

// pace progress bar
Pace.start()

// use pace hook to know when rendering is ready
Pace.once('hide', () => {
  window.prerenderReady = true
})
