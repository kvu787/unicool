// http://stackoverflow.com/a/202627/1559886
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
};

function UnicodeCtrl($scope) {
    $scope.number = "";
}