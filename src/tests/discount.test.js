const { applyDiscount } = require('../utils/discount');


describe('applyDiscount', () => {


    it('should return price multiplied by 0.9', () => {
        const total = 501;

        const result = applyDiscount(total);

        expect(parseFloat(result).toPrecision(5)).toBe(parseFloat(450.90).toPrecision(5));
    });

    it('should return price multiplied by 0.95', () => {
        const total = 201;

        const result = applyDiscount(total);

        expect(parseFloat(result).toPrecision(5)).toBe(parseFloat(190.95).toPrecision(5))
    });

    it('should return normal price', () => {

        const total = 199;

        const result = applyDiscount(199);

        expect(result).toBe(199);
    });



});



