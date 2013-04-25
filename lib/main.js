var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");

var decodeMorse = contextMenu.Item({
    label: "Morse",
    contentScriptFile: self.data.url("decoders/morse.js")
});

var decodeMenu = contextMenu.Menu({
    label: "Decode",
    items: [decodeMorse]
});

var foxhoundMenu = contextMenu.Menu({
    label: "Foxhound",
    context: contextMenu.SelectionContext(),
    items: [decodeMenu]
});
