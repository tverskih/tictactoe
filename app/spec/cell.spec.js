describe('Cell', function () {
    var $injector       = angular.injector(['myApp']);
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var CellModel       = $injector.get('CellModel');

    var cell;
    var symbolX = new PlaySymbolModel('x');
    var symbolY = new PlaySymbolModel('y');

    beforeEach(function () {
        cell = new CellModel();
    });

    it('isSet method returns false if ', function () {
        expect(cell.isSet()).toEqual(false);
    });

    it('isSet methods returns true is symbol has been set to cell', function () {
        cell.setSymbol(symbolX);
        expect(cell.isSet()).toEqual(true);
    });

    it('getSymbol returns symbol that was set', function () {
        cell.setSymbol(symbolX);
        expect(cell.getSymbol()).toEqual(symbolX);
    });
});