export default {
  app: {
    collisionDistance: 22,
    doubleClickDistance: 20,
    maxFrequency: 1500
  },
  transport: {
    height: 35
  },
  canvas: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },
  particle: {
    count: 1,
  },
  synth: {
    color: 'darkorange',
    envelope: {
      attack: 0.01,
      release: 0.01
    }
  },
  fx: {
    delay: {
      time: 0.5,
      feedback: 0.0
    },
    filter: {
      q: 0,
      cutoffFrequency: 2000,
      attack: 0
    },
    waveShaper: {
      amount: 400,
      oversample: '4x'
    },
    reverb: {
      amount: 0,
      impulseResponses: [{
          url: '/audio/ir/hamilton-mausoleum.wav',
          label: 'Hamilton Mausoleum',
          info: [
            'Construction on the Hamilton Mausoleum, Hamilton, Scotland, built for the 10th Duke of Hamilton, started in 1842 and was completed in 1858.',
            'It is constructed of marble and sandstone and is surmounted by a dome 36m in height, with two main spaces, a crypt in the lower section, and a chapel that was supposed to be used for worship.',
            'However the construction materials, size, shape and dimensions of the latter result in a complex, dense and very long reverberation, and hence render it almost useless for speech presentation.',
            'In fact the Guinness Book of World Records claims that the Hamilton Mausoleum has the longest “echo” of any building, recorded on 27 May 1994 as taking 15s for the sound of the reverberation caused by slamming one of the main doors to die away to nothing.',
            'The space is now often used by recording musicians for its unique acoustic properties.',
            'The interior of Hamilton Mausoleum is approximately octagonal in plan, with a diameter of 18 m.',
            'Each side of the octagon is either a plane wall or a further semicircular alcove.',
            'The results presented below having the microphone assembly in the centre and the source placed to one side, just outside one of the alcoves, giving a source-receiver distance of 4.8 m.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/hamilton-mausoleum'
        }, {
          url: '/audio/ir/abernyte-grain-silo.wav',
          label: 'Abernyte Grain Silo',
          info: [
            'A concrete structure standing approximately 20m in height by by 5m in diameter the silo proved to have a fantastic reverberation quality close to 6 seconds from initial impulse to the sound dying away.',
            'Opportunist recording of balloon burst IR captured using an Alesis Palmtrack portbale recorder.',
            'Having passed this disused grain silo on the way to Errol brickworks I made a mental note to stop and explore on the way home.',
            'The silo probably a structure from the 60\'s or 70\'s is a typical cylindrical building but with a flat roof.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/abernyte-grain-silo'
        } , {
          url: '/audio/ir/falkland-palace-bottle-dungeon.wav',
          label: 'Falkland Palace Bottle Dungeon',
          info: [
            'An Impulse Response recorded in the bottle dungeon found in Falkland Palace.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/falkland-palace-bottle-dungeon'
        }, {
          url: '/audio/ir/r1-nuclear-reactor-hall.wav',
          label: 'R1 Nuclear Reactor Hall',
          info: [
            'Built in 1954, the R1 Nuclear Reactor has not been used since 1970. However, the reactor hall still remains.',
            'It is found 25 metres underneath the KTH Royal Institute of Technology, near to Stolkholm.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/r1-nuclear-reactor-hall'
        }, {
          url: '/audio/ir/tvísöngur-sound-sculpture.wav',
          label: 'Tvísöngur Sound Sculpture',
          info: [
            'Opened to the public in 2012 and situated in the mountains above Seydisfjordur, north east Iceland, Tvísöngur is a sound sculpture designed by German artist Lukas Kuhne.',
            'Constructed entirely of smooth unpainted concrete at 100mm thick throughout, it consists of five interconnected domes - nicknamed "Fa", "La", "Si", "Do" and "Mi" in order of decreasing size.',
            'Each dome’s distinct size produces an individual resonant frequency corresponding to a tone in traditional Icelandic five-part harmony.',
            'Rounded archway openings built into the walls of each dome allow visitors to enter the structure and experience the unique acoustical characteristics of the space.',
            'These arched openings also act as Helmholtz resonators, as wind blowing in off the cliffs rushes into and across the openings, the air within the structure resonates.',
            'Nicknamed the ‘singing concrete’, Tvísöngur was designed for several voices in order to preserve Iceland’s musical heritage, which was one of the first and now only surviving forms of improvised polyphonic chants in Europe.',
            'In collaboration with the artist Lukas Kühne, using ODEON acoustic simulation software, an acoustic model replica of the structure was built in order to visualise how sound propagates through the structure, investigate how certain frequencies are resonated by each individual dome, and produce simulated impulse responses to create auralizations.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/tv%C3%ADs%C3%B6ngur-sound-sculpture-iceland-model'
        }, {
          url: '/audio/ir/york-minster.wav',
          label: 'York Minster',
          info: [
            'York Minster is the largest medieval gothic cathedral in the UK and one of the finest in Europe, built between the 12th and 15th centuries on the foundations of the previous Norman church that was in turn constructed on the foundations of the original Roman fortress.',
            'It is approximately 160m long, 76m wide and 27m high to the vaulted ceiling, constructed predominantly of stone with extensive, large panels of stained glass windows.',
            'Its beautiful acoustic and setting make it a sought after and highly popular music performance venue.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/york-minster'
        }, {
          url: '/audio/ir/st-marys-abbey-reconstruction.wav',
          label: 'St. Mary\'s Abbey Reconstruction',
          info: [
            'The abbey of St. Mary was mostly destroyed during the dissolution under the rule of Henry VIII and now only ruins remain.',
            'These ruins can be found in the Museum Gardens adjacent to the river Ouse in York city.',
            'Virtual models of this now derelict church were built using measurements taken from scaled plans and other sources of architectural evidence.',
            'Impulse responses were then created using ray-based room acoustic modelling software.',
            'Three different models of the church were used with increasing levels of detail in their geometric structure, referred to as Phase 1, Phase 2 and Phase 3.',
            'The work was carried out as part of a Bachelor of Engineering project at the Audiolab in the University of York.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/st-marys-abbey-reconstruction'
        }, {
          url: '/audio/ir/terrys-typing-room.wav',
          label: 'Terry\'s Typing Room',
          info: [
            'These Impulse Responses were measured in the partitioned typing room inside the Terry\'s chocolate and confectionery factory in York.',
            'The factory was closed in 2005 and the site is planned for redevelopment.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/terrys-typing-room'
        }, {
          url: '/audio/ir/errol-brickworks-kiln.wav',
          label: 'Errol Brickworks Kiln',
          info: [
            'Errol Brickworks situated on the outskirts of Errol Village, Perth and Kinross is now a Mackies potato crisps factory but two kilns remain.',
            'The works dates to 1870 and remained active until the mid nineties.',
            'The structure of the kilns looked like large brick built yurts, with the external walls below the dome strapped in metal casing.',
            'The internal dimensions are 6.5m to the height of the dome form the centre of the floor by 5.8m in diameter.',
            'Mackies staff allowed access to one of the kilns on the day of our visit.',
            'Two techniques were employed, a sine sweep recording using Apple\'s Impulse Response Utility software and a balloon pop recorded using a portable Alesis Palmtrack.',
            'Initially the reverberation characteristic appeared to be unremarkable having very little decay time, however upon wondering around inside the kiln a pronounced pre-delay was evident.',
            'Whilst standing close to the opposite wall from the entrance noise made by Paul near the entrance appeared to reverberate around the outside wall creating an effect similar to the whispering gallery found in the dome of St Paul\'s Cathedral in London, all be it more subtle.'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/errol-brickworks-errol-perth-and-kinross'
        }, {
          url: '/audio/ir/dromagorteen-stone-circle.wav',
          label: 'Dromagorteen Stone Circle',
          info: [
            'Dromagorteen stone circle (Early/Middle Bronze Age: 2000 to 1150 BCE) has 13 stones, one is a recumbent stone and two are portal stones.',
            'It belongs to the group Axial Stone Circles (ASC) in Co. Kerry and Co. Cork in Ireland.',
            'There is some periodic sound (-56 dB and every 0.37sec), don\'t know what it is...'
          ],
          infoUrl: 'http://www.openairlib.net/auralizationdb/content/dromagorteen-stone-circle-co-kerry-ireland'
        }
      ]
    }
  },
  midi: {
    color: 'limegreen'
  },
  audio: {
    color: 'deepskyblue'
  },
  stream: {
    color: 'deeppink',
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 30]
  },
  circularStream: {
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 3],
    font: '12px Arial',
    fillStyle: 'gold',
    textAlign: 'center'
  },
  linearStream: {
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 3],
    font: '12px Arial',
    fillStyle: 'gold',
    textAlign: 'center'
  },
  selectedStream: {
    strokeStyle: 'gold',
  },
  link: {
    strokeStyle: 'gray',
    lineWidth: 3,
    lineDash: [3, 3]
  },
  unlink: {
    strokeStyle: 'crimson'
  },
  knob: {
    zeroColor: 'dimgray'
  },
  fader: {
    marks: {
      0: '-0',
      0.1: '-1',
      0.2: '-2',
      0.3: '-3',
      0.4: '-4',
      0.5: '-5',
      0.6: '-6',
      0.7: '-7',
      0.8: '-8',
      0.9: '-9',
      1: '-10'
    }
  },
  waveToggle: {
    emptyMarks: {
      0: ' ',
      1: ' ',
      2: ' ',
      3: ' '
    }
  },
  controlPanel: {
    width: 300,
    adsr: {
      marks: {
        0.0: '-',
        0.1: ' ',
        0.2: '-',
        0.3: ' ',
        0.4: '-',
        0.5: ' ',
        0.6: '-',
        0.7: ' ',
        0.8: '-',
        0.9: ' ',
        1.0: ' '
      }
    }
  },
  fxPanel: {
    height: 225
  },
  menu: {
    width: 56
  }
};
