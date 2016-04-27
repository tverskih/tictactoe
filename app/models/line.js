(function (angular) {
    "use strict";

    angular.module('myApp').factory('LineModel', LineModelFactory);

    function LineModelFactory() {
        function LineModel(cell1, cell2, cell3) {
            this.cell1 = cell1;
            this.cell2 = cell2;
            this.cell3 = cell3;
        }

        var prototype = LineModel.prototype;

        prototype.isWinning = function () {
            var result = true,
                sym1 = this.cell1.getSymbol(),
                sym2 = this.cell2.getSymbol(),
                sym3 = this.cell3.getSymbol();

            result = result && !!sym1.toString() && !!sym2.toString() && !!sym3.toString();
            result = result && (sym1.isEqualTo(sym2));
            result = result && (sym2.isEqualTo(sym3));

            return result;
        };

        prototype.isEmpty = function () {
            var result = true;
            result = result && !this.cell1.getSymbol().toString();
            result = result && !this.cell2.getSymbol().toString();
            result = result && !this.cell3.getSymbol().toString();

            return result
        };

        prototype.getCells = function () {
            return [this.cell1, this.cell2, this.cell3];
        };

        prototype.countSymbol = function (playSymbol) {
            var counter = 0;
            if (this.cell1.getSymbol().isEqualTo(playSymbol)) { counter += 1; }
            if (this.cell2.getSymbol().isEqualTo(playSymbol)) { counter += 1; }
            if (this.cell3.getSymbol().isEqualTo(playSymbol)) { counter += 1; }

            return counter;
        };

        prototype.countEnemySymbol = function (playSymbol) {
            var counter = 0,
                sym1    = this.cell1.getSymbol(),
                sym2    = this.cell2.getSymbol(),
                sym3    = this.cell3.getSymbol();

            if (this.cell1.isSet() && !sym1.isEqualTo(playSymbol)) { counter += 1; }
            if (this.cell2.isSet() && !sym2.isEqualTo(playSymbol)) { counter += 1; }
            if (this.cell3.isSet() && !sym3.isEqualTo(playSymbol)) { counter += 1; }

            return counter;
        };

        prototype.getEmptyCell = function () {
            if (!this.cell1.isSet()) { return this.cell1; }
            if (!this.cell2.isSet()) { return this.cell2; }
            if (!this.cell3.isSet()) { return this.cell3; }

            return null;
        };

        return LineModel;
    }

}(angular));