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

for(codecName in encoders) {
    if(encoders.hasOwnProperty(codecName)) {
        encoderItems.push(contextMenu.Item({
            label: encoders[codecName],
            contentScriptFile: self.data.url("encoders/" + codecName + ".js"),
            onMessage: flashMessage
        }));
    }
}

var encodeMenu = contextMenu.Menu({
    label: "Encode",
    items: encoderItems
});


var decoderItems = [];

for(codecName in decoders) {
    if(decoders.hasOwnProperty(codecName)) {
        decoderItems.push(contextMenu.Item({
            label: decoders[codecName],
            contentScriptFile: self.data.url("decoders/" + codecName + ".js"),
            onMessage: flashMessage
        }));
    }
}

var decodeMenu = contextMenu.Menu({
    label: "Decode",
    items: decoderItems
});


var bidirectionalItems = [];

for(codecName in bidirectional) {
    if(bidirectional.hasOwnProperty(codecName)) {
        bidirectionalItems.push(contextMenu.Item({
            label: bidirectional[codecName],
            contentScriptFile: self.data.url("bidirectional/" + codecName + ".js"),
            onMessage: flashMessage
        }));
    }
}


var foxhoundMenu = contextMenu.Menu({
    label: "Foxhound",
    context: contextMenu.SelectionContext(),
    items: [encodeMenu, decodeMenu].concat(bidirectionalItems)
});
