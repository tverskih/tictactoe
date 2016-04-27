describe('ArtificialIntelligence', function () {
    var $injector       = angular.injector(['myApp']);

    var AIPlayerModel   = $injector.get('AIPlayerModel');
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var PlaygroundModel = $injector.get('PlaygroundModel');

    var playground;
    var aiPlayer;
    var symbolX = new PlaySymbolModel('x');
    var symbolY = new PlaySymbolModel('y');

    beforeEach(function () {
        playground   = new PlaygroundModel();
        aiPlayer     = new AIPlayerModel(playground, symbolX);
    });

    it('should init with playground and player symbol', function () {
        expect(aiPlayer.playground === playground).toBe(true);
        expect(aiPlayer.playSymbol.isEqualTo(symbolX)).toBe(true);
    });

    it('should not make any turns and return false if playground is finished', function () {
        spyOn(playground, 'isFinished').and.returnValue(true);
        expect(playground.isFinished()).toBe(true);

        var result = aiPlayer.makeTurn();
        expect(result).toBe(false);
    });

    it('should make a first turn to the center of playground', function () {
        aiPlayer.makeTurn();

        var cells      = playground.getCells(),
            centerCell = playground.getCenterCell(),
            i;

        for (i = 0; i < cells.length; i += 1) {
            if (cells[i] === centerCell) {
                expect(cells[i].isSet()).toBe(true);
            } else {
                expect(cells[i].isSet()).toBe(false);
            }
        }
    });

    it('should finish its line with the winning turn', function () {
        var cells = playground.getCells();
        cells[0].setSymbol(symbolX);
        cells[1].setSymbol(symbolX);
        aiPlayer.makeTurn();
        expect(cells[2].getSymbol().isEqualTo(symbolX)).toBe(true);
    });

    it('should prevent enemy winning for interrupting his line', function () {
        var cells = playground.getCells();
        cells[0].setSymbol(symbolY);
        cells[1].setSymbol(symbolY);
        aiPlayer.makeTurn();
        expect(cells[2].getSymbol().isEqualTo(symbolX)).toBe(true);
    });

    it('should set symbol to corner if not lines can be interrupted/winned', function () {
        var cells = playground.getCells();
        cells[0].setSymbol(symbolY);
        aiPlayer.makeTurn();
        expect(cells[2].getSymbol().isEqualTo(symbolX)).toBe(true);
    });
})