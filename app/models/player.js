(function (angular) {
    "use strict";

    angular.module('myApp').factory('PlayerModel', PlayerModelFactory);

    function PlayerModelFactory() {
        function PlayerModel(playground, playSymbol, turnCallback) {
            this.playground   = playground;
            this.playSymbol   = playSymbol;
            this.turnCallback = turnCallback;
        }

        var prototype = PlayerModel.prototype;

        prototype.makeTurn = function (cell) {
            if (cell.isSet() || this.playground.isFinished()) { return false; }
            cell.setSymbol(this.playSymbol);
            this.turnCallback && this.turnCallback(this);
        }

        return PlayerModel;
    }

}(angular))