describe('This is a basic spec', function () {
    beforeEach(function () {
        console.log('Function executed before each test');
    });

    it('this should be true', function () {

        expect(true).toBe(true);

    });
    it('this should be false', function () {

        expect(false).toBe(false);

    });
});