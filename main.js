function UnicodeCtrl($scope) {
    $scope.decimal = '65';
    $scope.hex = '20ac';
    $scope.utf8 = '\u0041';

    $scope.printUnicode = function (val) {
        if (val < 0) {
            return 'cannot parse';
        }
        return String.fromCharCode(val);  
    };
    $scope.toUnicodeCodePoint = function (val) {
        if (val === '') {
            return 'cannot parse';
        }
        return val.charCodeAt(0).toString();  
    };
    $scope.convert = unicodeConvert;
    $scope.datatypes = datatypesEnum;
    $scope.utf8Bytes = binToUtf8Bytes;
    $scope.utf8BytesPadded = binToUtf8BytesPadded;
}