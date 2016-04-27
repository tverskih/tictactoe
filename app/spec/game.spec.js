describe('Game', function () {
    var $injector       = angular.injector(['myApp']);
    var GameModel       = $injector.get('GameModel');
    var PlaygroundModel = $injector.get('PlaygroundModel');
    var AIPlayerModel   = $injector.get('AIPlayerModel');
    var PlayerModel     = $injector.get('PlayerModel');

    beforeEach(function () {
        game = new GameModel();
    });

    it('inits players and playground', function () {
        expect(game.playground instanceof PlaygroundModel).toBe(true);
        expect(game.aiPlayer   instanceof AIPlayerModel).toBe(true);
        expect(game.realPlayer instanceof PlayerModel).toBe(true);
    });

    it('knows that first turn is of real player by default', function () {
        var currentPlayer = game.whoseTurn();
        expect(currentPlayer).toEqual(game.realPlayer);
    });

    it('can be init with option for first turn reserved for computer', function () {
        var game = new GameModel({computerFirst: true});
        var currentPlayer = game.whoseTurn();
        expect(game.lastTurn instanceof AIPlayerModel).toBe(true);
        expect(currentPlayer instanceof PlayerModel).toBe(true);
    });

    it('switches currentPlayer after turn made', function () {
        var cells = game.playground.getCells();

        expect(game.whoseTurn() instanceof PlayerModel).toBe(true);

        game.whoseTurn().makeTurn(cells[0]);

        expect(game.whoseTurn() instanceof AIPlayerModel).toBe(true);
    });
});