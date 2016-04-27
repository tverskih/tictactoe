describe('PlaySymbol', function(){
    var $injector       = angular.injector(['myApp']);
    var PlaySymbolModel = $injector.get('PlaySymbolModel');
    var symbolX, symbolY;

    beforeEach(function () {
        symbolX = new PlaySymbolModel('x');
        symbolY = new PlaySymbolModel('y');
    });

    it('returns value when toString method called', function () {
        expect(symbolX.toString()).toEqual('x');
        expect(symbolY.toString()).toEqual('y');
    });

    it('can be set to another value', function () {
        symbolX.setString('z');
        expect(symbolX.toString()).toEqual('z');
    });

    describe('playSymbols comparison', function () {
        it('returns true if values are equal', function () {
            var symbolX1 = new PlaySymbolModel('x');
            expect(symbolX.isEqualTo(symbolX1)).toEqual(true);
            expect(symbolX1.isEqualTo(symbolX)).toEqual(true);
        });

        it('returns false if values are not equal', function () {
            expect(symbolX.isEqualTo(symbolY)).toEqual(false);
        });
    });
});