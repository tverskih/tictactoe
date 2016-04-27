(function (angular) {
    "use strict";

    angular.module('myApp').factory('PlaygroundModel', PlaygroundModelFactory);

    function PlaygroundModelFactory(CellModel, LineModel) {
        var PLAYGROUND_CELLS_QTY = 9;
        var LINES_QTY            = 8;
        var LINES_CELL_INDEXES_MAP = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontals
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticals
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        var LINE_CELL_1_INDEX = 0;
        var LINE_CELL_2_INDEX = 1;
        var LINE_CELL_3_INDEX = 2;

        // Central cell index
        var CENTER_CELL_INDEX = 4;

        // Corners indexes
        var CELL_TOP_LEFT_INDEX     = 0;
        var CELL_TOP_RIGHT_INDEX    = 2;
        var CELL_BOTTOM_LEFT_INDEX  = 6;
        var CELL_BOTTOM_RIGHT_INDEX = 8;

        function PlaygroundModel() {
            var i;
            this.cells = [];
            this.lines = [];

            for (i = 0; i < PLAYGROUND_CELLS_QTY; i += 1) {
                this.cells.push(new CellModel());
            }

            for (i = 0; i < LINES_QTY; i +=1) {
                this.lines.push(
                    new LineModel(
                        this.cells[LINES_CELL_INDEXES_MAP[i][LINE_CELL_1_INDEX]],
                        this.cells[LINES_CELL_INDEXES_MAP[i][LINE_CELL_2_INDEX]],
                        this.cells[LINES_CELL_INDEXES_MAP[i][LINE_CELL_3_INDEX]]
                    )
                );
            }

        }

        var prototype = PlaygroundModel.prototype;

        prototype.clear = function () {
            this.cells = [];
            for (i = 0; i < PLAYGROUND_CELLS_QTY; i += 1) {
                this.cells.push(new CellModel());
            }

            return this;
        };

        prototype.isFinished = function () {
            if (this.getWinningLine()) { return true; }

            var result = true;

            angular.forEach(this.cells, function (cell) {
                result = result && cell.isSet();
            });

            return result;
        };

        prototype.isEmpty = function () {
            var result = true;
            angular.forEach(this.cells, function (cell) {
                result = result && !cell.isSet();
            });

            return result;
        };

        prototype.getCellsQty = function () {
            return PLAYGROUND_CELLS_QTY;
        };

        prototype.getCells = function () {
            return this.cells;
        };

        prototype.getLines = function () {
            return this.lines;
        };

        prototype.getWinningLine = function () {
            var i;
            for (i = 0; i < LINES_QTY; i += 1) {
                if (!this.lines[i].isWinning()) { continue; }

                return this.lines[i];
            }

            return null;
        };

        prototype.getCenterCell = function () {
            return this.cells[CENTER_CELL_INDEX];
        };

        prototype.getCornerCells = function () {
            return [
                this.cells[CELL_TOP_LEFT_INDEX],
                this.cells[CELL_TOP_RIGHT_INDEX],
                this.cells[CELL_BOTTOM_LEFT_INDEX],
                this.cells[CELL_BOTTOM_RIGHT_INDEX]
            ];
        };

        return PlaygroundModel;
    }

}(angular));