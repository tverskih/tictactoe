(function (angular) {
    "use strict";

    angular.module('myApp').factory('AIPlayerModel', AIPlayerModelFactory);

    function AIPlayerModelFactory() {
        function AIPlayerModel(playground, playSymbol, turnCallback) {
            this.playground   = playground;
            this.playSymbol   = playSymbol;
            this.turnCallback = turnCallback;
        }

        var prototype = AIPlayerModel.prototype;

        prototype.getCellForTurn = function () {
            var playground  = this.playground,
                playSymbol  = this.playSymbol,
                lines       = playground.getLines(),
                cells       = playground.getCells(),
                centerCell  = playground.getCenterCell(),
                cornerCells = playground.getCornerCells(),
                turnWasMade = false,
                emptyCell,
                i,
                resultCell  = undefined;

            /* Case 1 */
            // if no cells is available
            // or playground already has winning line
            // don't make turn and return false
            if (playground.isFinished()) { return undefined; }

            /* Case 2 */
            // if playground is empty then set to center
            if (playground.isEmpty()) { return centerCell; }

            /* Case 3.1 */
            // if on some line 2 player's symbols
            // THEN set 3rd winning
            for(i = 0; i < lines.length; i += 1) {
                emptyCell = lines[i].getEmptyCell();
                if (!emptyCell) { continue; }
                if (lines[i].countSymbol(playSymbol) === 2) {
                    return emptyCell;
                }
            }


            /* Case 3.2 */
            // if on some line 2 enemy's symbols
            // THEN set 3rd
            for(i = 0; i < lines.length; i += 1) {
                emptyCell = lines[i].getEmptyCell();
                if (!emptyCell) { continue; }
                if (lines[i].countEnemySymbol(playSymbol) === 2) {
                    return emptyCell;
                }
            }

            /* Case 4 */
            // on other cases find a free corner
            for (i = 0; i < cornerCells.length; i += 1) {
                if (!cornerCells[i].isSet()) {
                    return cornerCells[i];
                }
            }
        };

        prototype.makeTurn = function () {
            var cellForTurn = this.getCellForTurn();

            if (cellForTurn) {
                cellForTurn.setSymbol(this.playSymbol);
                this.turnCallback && this.turnCallback(this);

                return true;
            } else {

                return false;
            }
        };

        return AIPlayerModel;
    }

}(angular))