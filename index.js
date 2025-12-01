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