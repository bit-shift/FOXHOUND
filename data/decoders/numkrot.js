self.on("click", function() {
    var numkrotDecodeMap = {
        'a': 'u',
        'b': 'v',
        'c': 's',
        'd': 't',
        'e': 'o',
        'f': 'h',
        'g': 'k',
        'h': 'f',
        'i': 'y',
        'j': 'z',
        'k': 'g',
        'l': 'r',
        'm': 'n',
        'n': 'm',
        'o': 'e',
        'p': 'w',
        'q': 'x',
        'r': 'l',
        's': 'c',
        't': 'd',
        'u': 'a',
        'v': 'b',
        'w': 'q',
        'x': 'p',
        'y': 'i',
        'z': 'j'
    };

    for(inChar in numkrotDecodeMap) {
        if(numkrotDecodeMap.hasOwnProperty(inChar)) {
            numkrotDecodeMap[inChar.toUpperCase()] = numkrotDecodeMap[inChar].toUpperCase();
        }
    }

    self.postMessage(window.getSelection().toString().replace(/./g, function(c) {
        if(numkrotDecodeMap.hasOwnProperty(c)) {
            return numkrotDecodeMap[c];
        } else {
            return c;
        }
    }));
});
