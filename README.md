# Node ArtNet Protocol

[![GitHub release](https://img.shields.io/github/v/release/jeffreykog/node-artnet-protocol)](https://github.com/jeffreykog/node-artnet-protocol/releases)
[![npm](https://img.shields.io/npm/v/artnet-protocol.svg)](https://www.npmjs.com/package/artnet-protocol)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)

ArtNet protocol implementation in Nodejs. The goal is to make a protocol implementation
that is as complete and usable as possible.
Use-cases for this library are virtual ArtNet clients such as [ArtNet Hue Entertainment](https://github.com/jeffreykog/artnet-hue-entertainment),
or full ArtNet/DMX controllers.

## Features
* Automatic discovery using `ArtPoll` / `ArtPollReply`
* Low-level packet encoder/decoder which can be used as a binary protocol library without all other functionality.
* Sending/receiving of DMX data (`ArtDmx`)
* Sending/receiving of ArtNet TimeCode data (`ArtTimeCode`)

## Usage
Install Node ArtNet Protocol using NPM:
```shell
$ npm install --save artnet-protocol
```

Code usage:
```javascript
import { ArtNetController } from './dist/index.js';
import { ArtDmx } from './dist/protocol.js';

const controller = new ArtNetController();
controller.bind('0.0.0.0');
// The controller is now listening and responding to discovery traffic

// Send DMX data (Sequence 0, Physical input port 0, Universe 0.
controller.sendBroadcastPacket(new ArtDmx(0, 0, 0, [255, 0, 0]));

// Receive DMX data
controller.on('dmx', (dmx) => {
    // dmx contains an ArtDmx object
    console.log(dmx.universe, dmx.data);
});

// Receive timecode data
controller.on('timecode', (timecode) => {
    console.log(`ArtNet TimeCode received (running @ ${timecode.framerate} fps): ${timecode.getTimeCodeString()}`);
});
```

## Reference
* ArtNet protocol specification: https://artisticlicence.com/WebSiteMaster/User%20Guides/art-net.pdf
