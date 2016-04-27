(function (angular) {
    "use strict";

    angular.module('myApp').controller('MainController', MainController);

    function MainController($scope, GameModel, PlaygroundModel, PlaySymbolModel, PlayerModel, AIPlayerModel) {
        var game,
            playground;

        var Public = {
            newGame: function () {
                game       = new GameModel({
                    computerFirst: $scope.computerFirst
                });

                playground = game.playground;
                $scope.cells = playground.getCells();
            },
            makeTurn: function (cell) {
                if (game.playground.isFinished()) { return; }
                var currentPlayer = game.whoseTurn();
                if (currentPlayer instanceof PlayerModel) {
                    currentPlayer.makeTurn(cell);

                    // Trigger makeTurn loop for the next player
                    this.makeTurn();
                } else if (currentPlayer instanceof AIPlayerModel) {
                    currentPlayer.makeTurn();
                }

                $scope.cells = playground.getCells();
                $scope.winningLine = playground.getWinningLine();
            }
        };

        $scope.newGame  = Public.newGame;
        $scope.makeTurn = Public.makeTurn;
    }

}(angular));