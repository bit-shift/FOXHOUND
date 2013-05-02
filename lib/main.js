var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");

var encoders = {
    "numkrot": "Numkrot",
    "morse": "Morse Code"
}

var decoders = {
    "numkrot": "Numkrot",
    "morse": "Morse Code"
}

var bidirectional = {
    "rot13": "ROT13"
}


var injectFlasher = function(tab) {
    tab["-foxhound-flasher"] = tab.attach({
        contentScriptFile: self.data.url("flasher.js"),
    });
    tab.attach({
        contentScriptFile: self.data.url("css-inject.js")
    }).postMessage(self.data.load("foxhound.css"));
}

var flashMessage = function(message) {
    if(!(tabs.activeTab["-foxhound-flasher"])) {
        injectFlasher(tabs.activeTab);
    }

    try {
        tabs.activeTab["-foxhound-flasher"].postMessage(message);
    } catch (e) {
        injectFlasher(tabs.activeTab);
        tabs.activeTab["-foxhound-flasher"].postMessage(message);
    }
};

var encoderItems = [];

for(encoderName in encoders) {
    if(encoders.hasOwnProperty(encoderName)) {
        encoderItems.push(contextMenu.Item({
            label: encoders[encoderName],
            contentScriptFile: self.data.url("encoders/" + encoderName + ".js"),
            onMessage: flashMessage
        }));
    }
}

for(encoderName in bidirectional) {
    if(bidirectional.hasOwnProperty(encoderName)) {
        encoderItems.push(contextMenu.Item({
            label: bidirectional[encoderName],
            contentScriptFile: self.data.url("bidirectional/" + encoderName + ".js"),
            onMessage: flashMessage
        }));
    }
}

var encodeMenu = contextMenu.Menu({
    label: "Encode",
    items: encoderItems
});

var decoderItems = [];

for(decoderName in decoders) {
    if(decoders.hasOwnProperty(decoderName)) {
        decoderItems.push(contextMenu.Item({
            label: decoders[decoderName],
            contentScriptFile: self.data.url("decoders/" + decoderName + ".js"),
            onMessage: flashMessage
        }));
    }
}

for(decoderName in bidirectional) {
    if(bidirectional.hasOwnProperty(decoderName)) {
        decoderItems.push(contextMenu.Item({
            label: bidirectional[decoderName],
            contentScriptFile: self.data.url("bidirectional/" + decoderName + ".js"),
            onMessage: flashMessage
        }));
    }
}

var decodeMenu = contextMenu.Menu({
    label: "Decode",
    items: decoderItems
});


var foxhoundMenu = contextMenu.Menu({
    label: "Foxhound",
    context: contextMenu.SelectionContext(),
    items: [encodeMenu, decodeMenu]
});
