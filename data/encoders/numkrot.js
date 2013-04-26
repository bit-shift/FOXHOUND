self.on("click", function() {
    var numkrotEncodeMap = {
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
        'p': 'x',
        'q': 'w',
        'r': 'l',
        's': 'c',
        't': 'd',
        'u': 'a',
        'v': 'b',
        'w': 'p',
        'x': 'q',
        'y': 'i',
        'z': 'j'
    };

    for(inChar in numkrotEncodeMap) {
        if(numkrotEncodeMap.hasOwnProperty(inChar)) {
            numkrotEncodeMap[inChar.toUpperCase()] = numkrotEncodeMap[inChar].toUpperCase();
        }
    }

    self.postMessage(window.getSelection().toString().replace(/./g, function(c) {
        if(numkrotEncodeMap.hasOwnProperty(c)) {
            return numkrotEncodeMap[c];
        } else {
            return c;
        }
    }));
});
