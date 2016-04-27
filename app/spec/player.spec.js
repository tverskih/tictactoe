 describe('Player', function () {
    var $injector       = angular.injector(['myApp']);

    var PlayerModel     = $injector.get('PlayerModel');
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var PlaygroundModel = $injector.get('PlaygroundModel');

    var playground;
    var player;
    var symbolX = new PlaySymbolModel('x');
    var symbolY = new PlaySymbolModel('y');

    beforeEach(function () {
        playground   = new PlaygroundModel();
        player     = new PlayerModel(playground, symbolX);
    });

    it('should init with playground and player symbol', function () {
        expect(player.playground === playground).toBe(true);
        expect(player.playSymbol.isEqualTo(symbolX)).toBe(true);
    });

    it('should set its symbol when make turn to empty cell', function () {
        var cells = playground.getCells();

        expect(cells[0].isSet()).toBe(false);
        player.makeTurn(cells[0]);
        expect(cells[0].isSet()).toBe(true);
        expect(cells[0].getSymbol().isEqualTo(symbolX)).toBe(true);
    });

    it('should not change the symbol on already set cell', function () {
        var cells =  playground.getCells();
        cells[0].setSymbol(symbolY);
        expect(cells[0].getSymbol().isEqualTo(symbolY)).toBe(true);
        player.makeTurn(cells[0]);
        expect(cells[0].getSymbol().isEqualTo(symbolY)).toBe(true);
    });




})