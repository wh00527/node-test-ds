module.exports = {
    ipd: {
        name: 'Super iPad',
        RRP: 549.99,
        deduction: null,
        discount: {
            min: 4,
            price: 499.99,
        },
        bundleSku: null,
    },
    mbp: {
        name: 'MacBook Pro',
        RRP: 1399.99,
        deduction: null,
        discount: null,
        bundleSku: null,
    },
    atv: {
        name: 'Apple TV',
        RRP: 109.50,
        deduction: {
            min: 3,
            discountItems: 2,
        },
        discount: null,
        bundleSku: null,
    },
    vga: {
        name: 'VGA adapter',
        RRP: 30,
        deduction: null,
        discount: null,
        bundleSku: 'mbp',
    }
};