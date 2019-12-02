class shoppingBundleCheckout {
  constructor(priceRules) {
    this.priceRules = priceRules;
    this.totalPrice = 0;
    this.items = new Map([]);
  }

  /*  
    scan items into certain bundle
    @param {item} - overall Skus that need to be analysed 
    return void
  */
  scan(item) {
    if (this.priceRules[item]) {
      if (!this.items.has(item)) {
        this.items.set(item, 1);
      } else {
        const count = this.items.get(item);
        this.items.set(item, count + 1);
      }
    } else {
      console.log(`we can not find ${item}.`);
    }
  }

  /*  
    console log all items and total price
    return void
  */

  showResult() {
    console.log("Sku Scanned: ", this.getAllItems());
    console.log("Total Price: ", this.totalPrice);
  }

  /*  
    reset items and total price
    return void
  */
  reset() {
    this.items = new Map([]);
    this.totalPrice = 0;
  }

  /*  
    calculate total bundle price of each deal
    return total price
  */

  total() {
    for (const [productSku, productCount] of this.items) {
      //calculate free bundle price
      if (
        this.priceRules[productSku].bundleSku &&
        this.priceRules[productSku].bundleSku !== null
      ) {
        const targeSkuItems =
          this.items.get(this.priceRules[productSku].bundleSku) || 0;
        const validBundles = Math.min(targeSkuItems, productCount);
        this.totalPrice += this.accMul(
          productCount - validBundles,
          this.priceRules[productSku].RRP
        );
        // make price down into brand new level
      } else if (
        this.priceRules[productSku].deduction &&
        this.priceRules[productSku].deduction !== null &&
        productCount >= this.priceRules[productSku].deduction.min
      ) {
        this.calcDeduction(productSku, productCount);
      } // buy x get y free
      else if (
        this.priceRules[productSku].discount &&
        this.priceRules[productSku].discount !== null &&
        productCount >= this.priceRules[productSku].discount.min
      ) {
        this.totalPrice += this.accMul(
          productCount,
          this.priceRules[productSku].discount.price
        );
      } else {
        this.totalPrice += this.accMul(
          this.priceRules[productSku].RRP,
          productCount
        );
      }
    }

    //console.log(this.items);
    this.totalPrice = this.totalPrice.toFixed(2);

    // Display the result
    this.showResult();
    return parseFloat(this.totalPrice);
  }

  /*  
    get all scanned Skus
    return array
  */
  getAllItems() {
    return [...this.items];
  }

  /*  
    calculate total bundle price of each deal
    return total price
  */

  calcDeduction(sku, productCount) {
    const deductionCount =
      productCount / this.priceRules[sku].deduction.min || 1;
    const deductionBundlePrice =
      deductionCount *
      this.priceRules[sku].deduction.discountItems *
      this.priceRules[sku].RRP;
    const normalSetsPrice = this.accMul(
      this.priceRules[sku].RRP,
      productCount - deductionCount * this.priceRules[sku].deduction.min
    );
    this.totalPrice += this.accAdd(deductionBundlePrice, normalSetsPrice);
  }

  /*
        Fixing javascript multiple number's float bug
        @param {number} arg1
        @param {number} arg2
        return number
     */
  accMul(arg1, arg2) {
    let m = 0,
      s1,
      s2;
    try {
      s1 = arg1.toString();
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      s2 = arg2.toString();
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  }

  /*
        Fixing javascript adding number's float bug
        @param {number} arg1 
        @param {number} arg2
        return number
    */
  accAdd(arg1, arg2) {
    let r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }
}

module.exports = shoppingBundleCheckout;
