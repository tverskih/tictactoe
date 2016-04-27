describe('Cell', function () {
    var $injector       = angular.injector(['myApp']);
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var CellModel       = $injector.get('CellModel');
    var LineModel       = $injector.get('LineModel');

    // var cell;
    var symbolEmpty = new PlaySymbolModel();
    var symbolX = new PlaySymbolModel('x');
    var symbolY  = new PlaySymbolModel('y');
    var cell1;
    var cell2;
    var cell3;


    beforeEach(function () {
        cell1 = new CellModel(symbolX);
        cell2 = new CellModel(symbolX);
        cell3 = new CellModel(symbolX);
        cell4 = new CellModel(symbolY);
        cellEmpty1 = new CellModel(symbolEmpty);
        cellEmpty2 = new CellModel(symbolEmpty);
        cellEmpty3 = new CellModel(symbolEmpty);
    });

    it('returns its cells', function () {
        var line  = new LineModel(cell1, cell2, cell3),
            cells = line.getCells();

        expect(cells[0]).toEqual(cell1);
        expect(cells[1]).toEqual(cell2);
        expect(cells[2]).toEqual(cell3);
    });

    it('counts symbols', function () {
        var line  = new LineModel(cell1, cell2, cell4);
        expect(line.countSymbol(symbolX)).toEqual(2);
        expect(line.countSymbol(symbolY)).toEqual(1);
    });

    it('counts enemy symbols', function () {
        var line  = new LineModel(cell1, cell2, cell4);
        expect(line.countEnemySymbol(symbolX)).toEqual(1);
        expect(line.countEnemySymbol(symbolY)).toEqual(2);
    });


    describe('getEmptyCell method', function () {
        it('returns empty cell if any', function () {
            var line1 = new LineModel(cell1, cellEmpty1, cell2);
            var line2 = new LineModel(cellEmpty2, cell1, cell2);
            var line3 = new LineModel(cell1, cell2, cellEmpty3);

            expect(line1.getEmptyCell().isSet()).toBe(false);
            expect(line2.getEmptyCell().isSet()).toBe(false);
            expect(line3.getEmptyCell().isSet()).toBe(false);

            expect(line1.getEmptyCell() === cellEmpty1).toBe(true);
            expect(line2.getEmptyCell() === cellEmpty2).toBe(true);
            expect(line3.getEmptyCell() === cellEmpty3).toBe(true);
        });

        it('returns null if no empty cells', function () {
            var line  = new LineModel(cell1, cell2, cell3);
                emptyCell = line.getEmptyCell();
            expect(emptyCell).toEqual(null);
        });
    });

    describe('isEmpty method', function () {
        it('returns true if all cells have empty symbols', function () {
            var line = new LineModel(cellEmpty1, cellEmpty2, cellEmpty3);
            expect(line.isEmpty()).toEqual(true);
        });

        it('returns false if some of cells are not empty', function () {
            var line = new LineModel(cellEmpty1, cellEmpty2, cell1);
            expect(line.isEmpty()).toEqual(false);
        });
    });

    describe('isWinning method', function () {

        it('returns true if all symbols are equal and not null', function () {
            var line  = new LineModel(cell1, cell2, cell3);
            expect(line.isWinning()).toEqual(true);
        });

        it('returns false if symbols are not equal', function () {
            var line1  = new LineModel(cell1, cell2, cell4);
            var line2  = new LineModel(cell1, cell4, cell2);
            var line3  = new LineModel(cell4, cell1, cell2);

            expect(line1.isWinning()).toEqual(false);
            expect(line2.isWinning()).toEqual(false);
            expect(line3.isWinning()).toEqual(false);
        });

        it('returns false if all symbols are empty', function () {
            var line = new LineModel(cellEmpty1, cellEmpty2, cellEmpty3);
            expect(line.isWinning()).toEqual(false);
        });
    });
});