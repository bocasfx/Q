<p align="center"><img src="./resources/icon/icon.png" width="256px"/></p>

### <p align="center">Q - Nodular Synthesizer/Sequencer</p>

------

Q is a Nodular Synthesizer/Sequencer controlled by the interactions between nodes and particle streams. It was built using <a href="https://electron.atom.io/" target="_blank">Electron</a> and <a href="https://facebook.github.io/react/" target="_blank">React</a>.

![Q](./resources/docs/ui.png)

## Nodes

Nodes generate sound whenever they become in contact with a particle. There are three different types of nodes:

- **Synth**
  - Two oscillators per node.
  - Sine, triangle, square, and sawtooth waveforms.
  - Noise generator.
  - Independent frequency and gain controls for each oscillator.
  - Attack and release controls.
  - Lag and probability controls.
  - Pan control.
  - FX chain send control.
- **MIDI**
  - noteOn/noteOff messages to the specified MIDI destination.
  - Lag and probability controls.
  - Velocity control.
  - Note and octave selectors.
  - MIDI destination selector.
- **Audio**
  - Audio sample file playback (wav, mp3, aiff, etc. )
  - Attack and release controls.
  - Lag and probability controls.
  - Pan control.
  - FX chain send control.

## Streams

Particles travel along the paths defined by streams. Streams can have zero or more particles. There are three different types of particles:

- **Linear**
  - Linear particle flow (user-defined length).
  - Particle count and speed controls.
- **Circular**
  - Circular particle flow (user-defined radius).
  - Particle count and speed controls.
- **Freehand**
  - Freehand particle flow (user defined path).
  - Particle count and speed controls.

## FX Chain

- **Wave Shaper**

  - Nonlinear distortion.

    | Min value                                | Max value                                |
    | ---------------------------------------- | ---------------------------------------- |
    | <img src="./resources/docs/waveshaper-min.png" width="300px"/> | <img src="./resources/docs/waveshaper-max.png" width="300px"/> |

- **Delay**

  - Time and Feedback controls

- **Biquad Filter**

  - Simple low-order filter.
  - Cuttof frequency, Q and Attack controls.

- **Reverb**

  - Amount control
  - Impulse responses:
    - [Hamilton Mausoleum](http://www.openairlib.net/auralizationdb/content/hamilton-mausoleum)
    - [Abernyte Grain Silo](http://www.openairlib.net/auralizationdb/content/abernyte-grain-silo)
    - [Falkland Palace Bottle Dungeon](http://www.openairlib.net/auralizationdb/content/falkland-palace-bottle-dungeon)
    - [R1 Nuclear Reactor Hall](http://www.openairlib.net/auralizationdb/content/r1-nuclear-reactor-hall)
    - [Tvísöngur Sound Sculpture, Iceland](http://www.openairlib.net/auralizationdb/content/tv%C3%ADs%C3%B6ngur-sound-sculpture-iceland-model)
    - [York Minster](http://www.openairlib.net/auralizationdb/content/york-minster)
    - [St. Mary's Abbey Reconstruction](http://www.openairlib.net/auralizationdb/content/st-marys-abbey-reconstruction)
    - [Terry's Typing Room](http://www.openairlib.net/auralizationdb/content/terrys-typing-room)
    - [Errol Brickworks, Errol, Perth and Kinross](http://www.openairlib.net/auralizationdb/content/errol-brickworks-errol-perth-and-kinross)
    - [Dromagorteen stone circle, Co. Kerry, Ireland](http://www.openairlib.net/auralizationdb/content/dromagorteen-stone-circle-co-kerry-ireland)

  ​

  ## User Guide

  |                   Icon                   | Action                                   |
  | :--------------------------------------: | :--------------------------------------- |
  | <img src="./resources/menu/grab.svg" width="50px"/> | **Grab nodes** - Click on a node to select it. Click and drag a node to change its position. |
  | <img src="./resources/menu/synth.svg" width="50px"/> | **Synth nodes** - Click anywhere on the display area to create a synth node. |
  | <img src="./resources/menu/midi.svg" width="50px"/> | **MIDI nodes** - Click anywhere on the display area to create a MIDI node. |
  | <img src="./resources/menu/audio.svg" width="50px"/> | **Audio nodes** - Click anywhere on the display area to create an audio node. |
  | <img src="./resources/menu/linear-stream.svg" width="50px"/> | **Linear Streams** - Click and drag anywhere on the display area to create a linear stream. |
  | <img src="./resources/menu/circular-stream.svg" width="50px"/> | **Circular Streams** - Click and drag anywhere on the display area to create a circular stream. |
  | <img src="./resources/menu/stream.svg" width="50px"/> | **Freehand Streams** - Click and drag anywhere on the display area to create a freehand stream. |
  | <img src="./resources/menu/clone.svg" width="50px"/> | **Clone nodes** - Click on a node to clone it. |
  | <img src="./resources/menu/link.svg" width="50px"/> | **Link nodes** - Click on a node and drag to a second node to link them. Messages travel from parent nodes to child nodes but not from child nodes to parent nodes. Loops are not allowed. |
  | <img src="./resources/menu/unlink.svg" width="50px"/> | **Unlink nodes** - Click on a parent node and drag to a child node to unlink them. |


