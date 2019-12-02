const shoppingBundleCheckout = require("../lib/checkout"),
      priceRules = require('../lib/priceRule'),
      chai  = require("chai"),
      expect = chai.expect;


describe('checkout', () => {
    
    describe('Constructor', () => {

        it('should be created with three properties: items, totalPrice, priceRules', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);
            expect(checkoutObj).to.have.property('items');
            expect(checkoutObj).to.have.property('totalPrice');            
            expect(checkoutObj).to.have.property('priceRules');            
        });

        it('checkout should have correct value in default', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            expect(Object.keys(checkoutObj.items).length ).to.equal(0);
            expect(typeof checkoutObj.items ).to.not.equal('undefined');
            expect(checkoutObj.totalPrice).to.equal(0);            
        });
    });

    describe('scan', () => {

        it('scan() - should add a new item into the cart', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            checkoutObj.scan('vga');
            expect(checkoutObj.items.get('vga')).to.equal(1);
            checkoutObj.scan('vga');
            expect(checkoutObj.items.get('vga')).to.equal(2);
            checkoutObj.scan('mbp');
            expect(checkoutObj.items.get('mbp')).to.equal(1);
        });

        it('scan() - should calculate total price correctly when apply for free bundle', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            checkoutObj.scan('mbp');            
            checkoutObj.scan('vga');            
            checkoutObj.scan('ipd');
            expect(checkoutObj.total()).to.equal(1949.98);
        });

        it('scan() - should calculate total price correctly when apply for deduction bundle', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            checkoutObj.scan('atv');            
            checkoutObj.scan('atv');            
            checkoutObj.scan('atv');
            checkoutObj.scan('vga');
            expect(checkoutObj.total()).to.equal(249.00);
        });

        it('scan() - should calculate total price correctly when apply for multiple discounts', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            

            checkoutObj.scan('atv');
            checkoutObj.scan('ipd');
            checkoutObj.scan('ipd');
            checkoutObj.scan('atv');
            checkoutObj.scan('ipd');
            checkoutObj.scan('ipd');
            checkoutObj.scan('ipd');
              expect(checkoutObj.total()).to.equal(2718.95);
            });

    });

    describe('reset', () => {

        it('reset() - should clear cart', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            checkoutObj.scan('vga');
            checkoutObj.reset();
            expect(checkoutObj.totalPrice).to.equal(0);            
        });
    });

    describe('getAllItems', () => {

        it('getAllItems() - should return correct array values', () => {
            let checkoutObj = new shoppingBundleCheckout(priceRules);            
            checkoutObj.scan('vga');
            expect(checkoutObj.getAllItems().length).to.equal(1);
            checkoutObj.scan('atv');
            expect(checkoutObj.getAllItems().length).to.equal(2);
        });
    });

    describe('accAdd', () => {

        it('should return 3', () => {
            let checkoutObj = new shoppingBundleCheckout();
            expect(checkoutObj.accAdd(1,2)).to.equal(3)
        });

        it('should return NaN with only one argument provided', () => {
            let checkoutObj = new shoppingBundleCheckout();            
            expect(isNaN(checkoutObj.accAdd(1))).to.equal(true)
        });
    });

    describe('accMul', () => {
    	
        it('should return 15', () => {
            let bundleObj = new shoppingBundleCheckout();
            expect(bundleObj.accMul(3,5)).to.equal(15)
        });
    });
});