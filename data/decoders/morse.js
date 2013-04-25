self.on("click", function() {
    var morseTable = {
        ".": "E",
        "-": "T",
        "..": "I",
        ".-": "A",
        "-.": "N",
        "--": "M",
        "...": "S",
        "..-": "U",
        ".-.": "R",
        ".--": "W",
        "-..": "D",
        "-.-": "K",
        "--.": "G",
        "---": "O",
        "....": "H",
        "...-": "V",
        "..-.": "F",
        ".-..": "L",
        ".--.": "P",
        ".---": "J",
        "-...": "B",
        "-..-": "X",
        "-.-.": "C",
        "-.--": "Y",
        "--..": "Z",
        "--.-": "Q",
        "-----": "0",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        ".-.-.-": ".",
        "--..--": ",",
        "..--..": "?",
        ".----.": "'",
        "-.-.--": "!",
        "-..-.": "/",
        "-.--.": "(",
        "-.--.-": ")",
        ".-...": "&",
        "---...": ":",
        "-.-.-.": ";",
        "-...-": "=",
        ".-.-.": "+",
        "-....-": "-",
        "..--.-": "_",
        ".-..-.": "\"",
        "...-..-": "$",
        ".--.-.": "@"
    };

    var deMorse = function(morseText) {
        var cleartext = "";
        var currentLetter = "";

        var i = 0;
        while(i < morseText.length) {
            if(["-", "."].indexOf(morseText[i]) !== -1) {
                currentLetter += morseText[i];
            } else if(morseText[i] === " ") {
                if(currentLetter.length > 0) {
                    cleartext += morseTable[currentLetter];
                    currentLetter = "";
                } else if(morseText[i-1] != "/") {
                    cleartext += " ";
                }
            } else if(morseText[i] === "/") {
                if((i == 0) || (morseText[i-1] !== " ")) {
                    cleartext += "/";
                } else {
                    cleartext += " ";
                }
            } else {
                cleartext += morseText[i];
            }
            i++;
        }

        if(currentLetter.length > 0) {
            cleartext += morseTable[currentLetter];
            currentLetter = "";
        } else if(cleartext.length > 0) {
            cleartext += " ";
        }

        return cleartext;
    }

    window.alert(deMorse("" + document.getSelection()));
});
