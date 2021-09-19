const crypto = require("crypto");
var aesjs = require('aes-js');

// const algorithm = 'aes-256-cbc';
// const salt = "84hbdksnsus84nh54pf-dmd=d,dos+ksmso82nfp";

var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31];

function cryptmd5(key){
    const str = key;

    const salt = "383hjg23g423uyg4233466sfolrfmrs4uj32g3";
    const md5Hasher = crypto.createHmac("md5", salt);
    const pwdhash = md5Hasher.update(str).digest("hex");
    
    return pwdhash;
}    

function encryptpwd(masterkey, password) {


    // was try to encrypt password this way; fine when ran on terminal; 
    // but in react app it's producing err :: scryptSync is not a function, same with scrypt
    // const key = scryptSync(masterkey, salt, 32);
    // const iv = Buffer.alloc(16, 0);

    // const cipher = crypto.createCipheriv(algorithm, key, iv);

    // let encrypted = '';
    // cipher.on('readable', () => {
    //     let chunk;
    //     while (null !== (chunk = cipher.read())) {
    //         encrypted += chunk.toString('hex');
    //     }
    // });
    // cipher.on('end', () => { });

    // cipher.write(password);
    // cipher.end();
    // return encrypted;

    
    var textBytes = aesjs.utils.utf8.toBytes(password);
    
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

function decryptpwd(masterkey, encpassword) {
    var encryptedBytes = aesjs.utils.hex.toBytes(encpassword);
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    
    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}

export {
    cryptmd5,
    decryptpwd,
    encryptpwd
}