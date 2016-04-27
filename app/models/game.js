(function (angular) {
    "use strict";

    angular.module('myApp').factory('GameModel', GameModelFactory);

    function GameModelFactory(PlaygroundModel, AIPlayerModel, PlayerModel, PlaySymbolModel) {
        function GameModel(options) {
            var firstPlayerSymbol  = new PlaySymbolModel('x'),
                secondPlayerSymbol = new PlaySymbolModel('o'),
                self = this;

            this.turnCallback = function (player) {
                self.lastTurn = player;
            };

            this.computerFirst = options && options.computerFirst;
            this.lastTurn   = undefined;
            this.playground = new PlaygroundModel();
            this.aiPlayer   = new AIPlayerModel(
                this.playground,
                this.computerFirst ? firstPlayerSymbol : secondPlayerSymbol,
                this.turnCallback
            );

            this.realPlayer = new PlayerModel(
                this.playground,
                this.computerFirst ? secondPlayerSymbol : firstPlayerSymbol,
                this.turnCallback
            );

            if (this.computerFirst) {
                this.aiPlayer.makeTurn();
            }
        }

        var prototype = GameModel.prototype;

        prototype.whoseTurn = function () {
            if (this.lastTurn === this.realPlayer || !this.lastTurn && this.computerFirst) {
                return this.aiPlayer;
            } else {
                return this.realPlayer;
            }
        };

        return GameModel;
    }

}(angular))