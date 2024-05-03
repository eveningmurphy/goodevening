// TO BE STORED BEFORE PUBLIC_HTML DIR FOR SECURITY
// Temp encryption - Caesar cipher - for beta admin login

// Function to encrypt text using Caesar Cipher
function encrypt(text, shift) {
    return text.split('').map(char => {
        let code = char.charCodeAt(0);

        if (char.match(/[a-z]/)) {
            code = ((code - 97 + shift) % 26 + 26) % 26 + 97;
        } else if (char.match(/[A-Z]/)) {
            code = ((code - 65 + shift) % 26 + 26) % 26 + 65;
        } else if (char.match(/[0-9]/)) {
            code = ((code - 48 + shift) % 10 + 10) % 10 + 48;
        }

        return String.fromCharCode(code);
    }).join('');
}

// Function to decrypt text using Caesar Cipher
function decrypt(text, shift) {
    return encrypt(text, -shift);
}

function compare(ciphertext, plaintext, shift){
    if ((encrypt(plaintext, shift) == ciphertext)){
        return true;
    }

    return false;
}