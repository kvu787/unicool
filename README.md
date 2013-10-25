Using the library (`unicode.js`):

	// The many forms of € (unicode character point '20ac')

	// hex to int 
	unicodeConvert('20ac', datatypesEnum.HEX, datatypesEnum.INT) === '8364';
	// int to utf8
	unicodeConvert('8364', datatypesEnum.INT, datatypesEnum.UTF8) === '111000101000001010101100';
	// utf8 to binary
	unicodeConvert('111000101000001010101100', datatypesEnum.UTF8, datatypesEnum.BIN) === '10000010101100';
	// binary to hex
	unicodeConvert('10000010101100;, datatypesEnum.BIN, datatypesEnum.HEX) === '20ac';