self.on("click", function() {
    var ciphertext = window.getSelection().toString();

    var key = null;
    while (key === null) {
        var maybeKey = window.prompt("Enter a key for decoding (a-z only):", "");
        if (!(maybeKey.match(/[^a-z]/gi))) {
            key = maybeKey.toUpperCase();
        } else {
            window.alert("Invalid key.");
        }
    }

    var keyPos = 0;
    var cleartext = "";

    for (var i = 0; i < ciphertext.length; i++) {
        var upperChar = ciphertext[i].toUpperCase();
        if ((upperChar >= 'A') && (upperChar <= 'Z')) {
            var keyCharOffset = key.charCodeAt(keyPos) - 'A'.charCodeAt();

            var cipherCharOffset = 0 - (upperChar.charCodeAt() - 'A'.charCodeAt());

            var clearCharOffset = (26 - ((26 + keyCharOffset + cipherCharOffset) % 26)) % 26;
            console.log(clearCharOffset);

            if (ciphertext[i] <= 'Z') {
                cleartext = cleartext + String.fromCharCode('A'.charCodeAt() + clearCharOffset);
            } else {
                cleartext = cleartext + String.fromCharCode('a'.charCodeAt() + clearCharOffset);
            }

            keyPos = (keyPos + 1) % key.length;
        } else {
            cleartext = cleartext + ciphertext[i];
        }
    }

    self.postMessage(cleartext);
});
