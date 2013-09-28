// depends on jquery

var datatypeEnum = {
    BIN : 0, 
    INT : 1,
    HEX : 2,
    UTF8 : 3, 
    // UTF16 : 4, 
    // UTF32 : 5
};

var unicodeConvert = function (val, fromType, toType) {
    return fromBin(toBin(val, fromType), toType);
}; 

// toBin converts a string to a numeric value specified by type.
// If the input is invalid, it returns -1.
// 
// TODO: Will strip off leading zeroes.
var toBin = function (val, type) {
    if (typeof val !== 'string') {
        return -1;
    }
    if (val < 0) {
        return -1;
    }
    var digits = '0123456789';
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    switch (type) {
        case datatypeEnum.BIN:
            if (!validateCharacters(val, '01')) {
                return -1;
            }
            return val;
        case datatypeEnum.INT:
            if (!validateCharacters(val, digits)) {
                return -1;
            }
            return parseInt((val).toString(), 10).toString(2);
        case datatypeEnum.HEX:
            if (!validateCharacters(val, digits + letters)) {
                return -1;
            }
            return parseInt((val).toString(), 16).toString(2);
        case datatypeEnum.UTF8:
            if (!validateCharacters(val, '01')) {
                return -1;
            }
            return utf8ToBin(val);
        // case datatypeEnum.UTF16:
        //     // not implemented
        //     if (!validateCharacters(val, '01')) {
        //         return -1;
        //     }
        // case datatypeEnum.UTF32:
        //     // not implemented
        //     if (!validateCharacters(val, '01')) {
        //         return -1;
        //     }
        default:
            return -1;
    }
};

// fromBin converts a valid binary string to a numeric string value specified by type.
// Returns -1 if val is not a valid binary string. 
var fromBin = function(val, type) {
    if (typeof val !== 'string') {
        return -1;
    }
    if (val < 0) {
        return -1;
    }
    if (!validateCharacters(val, '01')) {
        return -1;
    }
    val = parseInt(val, 2)
    switch (type) {
        case datatypeEnum.BIN:
            return val.toString(2);
        case datatypeEnum.INT:
            return val.toString(10);
        case datatypeEnum.HEX:
            return val.toString(16);
        case datatypeEnum.UTF8:
            return binToUtf8(val);
        // case datatypeEnum.UTF16:
        //     // not implemented
        //     break;
        // case datatypeEnum.UTF32:
        //     // not implemented
        //     break;
        default:
            return -1;
    }
};

// Converts a UTF-8 binary string to Unicode binary string.
// Assumes input is a valid UTF-8 binary string.
var utf8ToBin = function (val) {
    var utf8CodePoints = tokenizeUtf8(val);
    var res = [];
    for (var i = 0; i < utf8CodePoints.length; i++) {
        res.push(utf8ToUnicode(utf8CodePoints[i]));
    }
    return res.join('');
};

// Splits a UTF-8 binary string into an array of binary strings code points, 
// still with padding.
var tokenizeUtf8 = function (val) {
    var res = [];
    while (val.length !== '') {        
        if (val.lastIndexOf('0', '11110') === 0) {
            res.push(val.substr(0, 32));
            val = val.substr(32);
            continue;
        }
        if (val.lastIndexOf('0', '1110') === 0) {
            res.push(val.substr(0, 24));
            val = val.substr(24);
            continue;
        }
        if (val.lastIndexOf('0', '110') === 0) {
            res.push(val.substr(0, 16));
            val = val.substr(16);
            continue;
        }
        if (val.lastIndexOf('0', '0') === 0) {
            res.push(val.substr(0, 8));
            val = val.substr(8);
            continue;
        }
    }
    return res;
};

// Converts a single valid UTF-8 binary code point to a Unicode binary code point.
var utf8ToUnicode = function (val) {
    if (val.lastIndexOf('0', '11110') === 0) {
        return val.slice.substr(4, 4) + val.slice.substr(10, 6) + val.slice.substr(18, 6) + val.slice.substr(26, 6); 
    }
    if (val.lastIndexOf('0', '1110') === 0) {
        return val.slice.substr(3, 5) + val.slice.substr(10, 6) + val.slice.substr(18, 6);
    }
    if (val.lastIndexOf('0', '110') === 0) {
        return val.slice.substr(2, 6) + val.slice.substr(10, 6);
    }
    if (val.lastIndexOf('0', '0') === 0) {
        return val.slice.substr(1, 7);
    }
};

// Converts a valid binary string to UTF-8 binary.
var binToUtf8 = function (val) {
    var padding;
    if (val.length > 16) {
        padding = 21 - val.length;
        return '11110' + '0'.repeat(padding) + val.substr(0, 3 - padding) + '10' + val.substr(3 - padding, 6) + '10' + val.substr(9 - padding, 6) + '10' + val.substr(15 - padding);
    } 
    if (val.length > 11) {
        padding = 16 - val.length;
        return '1110' + '0'.repeat(padding) + val.substr(0, 4 - padding) + '10' + val.substr(4 - padding, 6) + '10' + val.substr(10 - padding);
    }
    if (val.length > 7) {
        padding = 11 - val.length;
        return '110' + '0'.repeat(padding) + val.substr(0, 5 - padding) + '10' + val.substr(5 - padding, 6);
    }
    return '0' + val;
};

var utf16ToBin = function (val) {
    // not implemented
};

var binToUtf16 = function (val) {
    // not implemented
};

var utf32ToBin = function (val) {
    // not implemented
};

var binToUtf32 = function (val) {
    // not implemented
};

var validateCharacters = function (val, valid) {
    valid = valid.split('');
    for (var i = 0; i < val.length; i++) {
        if ($.inArray(val[i], valid) < 0) {
            return false;
        }
    }
    return true;
};