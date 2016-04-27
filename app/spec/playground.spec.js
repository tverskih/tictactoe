describe('Cell', function () {
    var $injector       = angular.injector(['myApp']);
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var CellModel       = $injector.get('CellModel');
    var LineModel       = $injector.get('LineModel');
    var PlaygroundModel = $injector.get('PlaygroundModel');

    var PLAYGROUND_CELLS_QTY = 9;
    var LINES_QTY            = 8;
    var playground;

    var symbolX = new PlaySymbolModel('x');
    var symbolY = new PlaySymbolModel('y');

    beforeEach(function () {
        playground = new PlaygroundModel();
    });

    describe('isEmpty method', function () {
        it('should return false if some of cells are not empty', function () {
            var cells = playground.getCells();
            cells[0].setSymbol(symbolX);
            expect(playground.isEmpty()).toEqual(false);
        });

        it('should return true if all of cells are empty', function () {
            var cell = playground.getCells();
            expect(playground.isEmpty()).toEqual(true);
        });
    });

    describe('isFinished method', function () {
        it('should return true if there is a winning line AND empty cells', function () {
            var cells = playground.getCells();

            cells[0].setSymbol(symbolX);
            cells[4].setSymbol(symbolX);
            cells[8].setSymbol(symbolX);

            var winningLine  = playground.getWinningLine();
            expect(winningLine.isWinning()).toEqual(true);
            expect(playground.isFinished()).toEqual(true);
        });

        it('should return true if there is no winning line AND no empty cells', function () {
            var cells = playground.getCells(),
                i;

            angular.forEach(cells, function (cell, index) {
                cells[index].setSymbol(
                    [0,1,5,6,8].indexOf(index) > -1 ? symbolX : symbolY
                )
            });

            expect(playground.getWinningLine()).toEqual(null);
            expect(playground.isFinished()).toEqual(true);
        });

        it('should return false if there is no winning line AND some empty cells', function () {
            var cells = playground.getCells();
            cells[0].setSymbol(symbolX);

            expect(playground.isFinished()).toEqual(false);
        });
    });

    it('should return cells quantity', function () {
        var cellsQty = playground.getCellsQty();
        expect(cellsQty).toEqual(PLAYGROUND_CELLS_QTY);
    });

    it('should return 9 empty cells', function () {
        var cells      = playground.getCells(),
            i;

        expect(cells.length).toEqual(PLAYGROUND_CELLS_QTY);

        for(i = 0; i < cells.length; i += 1) {
            expect(cells[i].isSet()).toEqual(false);
        }
    });

    it('should return 8 lines', function () {
        var lines = playground.getLines();
        var cells = playground.getCells();
        expect(lines.length).toEqual(LINES_QTY);

        expect(lines[0].getCells()).toEqual([
            cells[0], cells[1], cells[2]
        ]);
    });

    it('should return winning line', function () {
        var cells = playground.getCells();

        cells[0].setSymbol(symbolX);
        cells[4].setSymbol(symbolX);
        cells[8].setSymbol(symbolX);

        var winningLine  = playground.getWinningLine(),
            winningCells = winningLine.getCells();

        expect(winningLine.isWinning()).toEqual(true);
        expect(winningCells[0]).toEqual(cells[0]);
        expect(winningCells[1]).toEqual(cells[4]);
        expect(winningCells[2]).toEqual(cells[8]);
    });

    it('should return null if no winning line' , function () {
        var winningLine = playground.getWinningLine();
        expect(winningLine).toEqual(null);
    });

    it('should clear itself', function () {
        var cells = playground.getCells();
        cells[0].setSymbol(symbolX);
        cells[4].setSymbol(symbolX);
        cells[8].setSymbol(symbolX);


        for(i = 0; i < cells.length; i += 1) {
            if ([0, 4, 8].indexOf(i) > -1) {
                expect(cells[i].isSet()).toEqual(true);
            } else {
                expect(cells[i].isSet()).toEqual(false);
            }
        }

        playground.clear();

        cells = playground.getCells();

        for(i = 0; i < cells.length; i += 1) {
            expect(cells[i].isSet()).toEqual(false);
        }

    });

    it('should return center cell', function () {
        var cells = playground.getCells();
        var centerCell = playground.getCenterCell();
        expect(centerCell === cells[4]).toBe(true);
        expect(centerCell === cells[3]).not.toBe(true);
    });

    it('should return corner cells', function () {
        var cells = playground.getCells();
        var cornerCells = playground.getCornerCells();

        expect(cornerCells[0] === cells[0]).toBe(true);
        expect(cornerCells[1] === cells[2]).toBe(true);
        expect(cornerCells[2] === cells[6]).toBe(true);
        expect(cornerCells[3] === cells[8]).toBe(true);
    });

});