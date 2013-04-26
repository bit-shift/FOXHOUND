var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");


var flashMessage = function(message) {
    if(!(tabs.activeTab["-foxhound-flasher"])) {
        tabs.activeTab["-foxhound-flasher"] = tabs.activeTab.attach({
            contentScriptFile: self.data.url("flasher.js"),
        });
        tabs.activeTab.attach({
            contentScriptFile: self.data.url("css-inject.js")
        }).postMessage(self.data.load("foxhound.css"));
    }
    tabs.activeTab["-foxhound-flasher"].postMessage(message);
};


var encoders = {
    "numkrot": "Numkrot",
    "morse": "Morse Code"
}
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

var encodeMenu = contextMenu.Menu({
    label: "Encode",
    items: encoderItems
});


var decoders = {
    "numkrot": "Numkrot",
    "morse": "Morse Code"
}
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

var decodeMenu = contextMenu.Menu({
    label: "Decode",
    items: decoderItems
});


var foxhoundMenu = contextMenu.Menu({
    label: "Foxhound",
    context: contextMenu.SelectionContext(),
    items: [encodeMenu, decodeMenu]
});
