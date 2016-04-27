(function (angular) {
    "use strict";

    angular.module('myApp').factory('PlaySymbolModel', PlaySymbolModelFactory);

    function PlaySymbolModelFactory() {
        function PlaySymbolModel(value) {
            this.value = value;
        }

        var prototype = PlaySymbolModel.prototype;

        prototype.toString = function () {
            return this.value;
        };

        prototype.setString = function (str) {
            this.value = str;
        };

        prototype.isEqualTo = function (playSymbol) {
            var result = this.value === playSymbol.toString();

            return result;
        }

        return PlaySymbolModel;
    }

}(angular));