(function (angular) {
    "use strict";

    angular.module('myApp').factory('CellModel', CellModelFactory);

    function CellModelFactory(PlaySymbolModel) {
        function CellModel(playSymbol) {
            this.playSymbol = playSymbol || (new PlaySymbolModel());
        }

        var prototype = CellModel.prototype;

        prototype.isSet = function () {
            return !!this.playSymbol.toString();
        };

        prototype.setSymbol = function (playSymbol) {
            this.playSymbol = playSymbol;

            return this;
        };

        prototype.getSymbol = function () {
            return this.playSymbol;
        };

        return CellModel;
    }

}(angular))