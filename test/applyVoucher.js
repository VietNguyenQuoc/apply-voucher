const expect = require("chai").expect;
const applyVoucher = require("../applyVoucher.js");
const _ = require("lodash");

describe.only("applyVoucher Unit Test", () => {
  const order = {
    id: 1,
    items: [
      {
        id: 1,
        price: 1,
        productId: 1,
        productName: "a",
        productDescription: "a",
        categoryName: "a",
        categoryId: 1,
        quantity: 1
      }
    ],
    totalPrice: 1
  };

  const voucher = {
    id: 1,
    eligibleProductIds: [1],
    eligibleCategoryId: 1,
    type: "percentage",
    target: "product",
    amount: 1
  };

  it("should return object with error and order props and when one of the item is not voucher discount type", () => {
    const result = applyVoucher(order, {
      ...voucher,
      eligibleProductIds: [2],
      target: "product"
    });

    expect(result).to.include.all.keys("error", "order");
  });

  it("should return object with error and order props when one of the item is not voucher category eligible", () => {
    const result = applyVoucher(order, {
      ...voucher,
      eligibleCategoryId: 2,
      target: "category"
    });

    expect(result).to.include.all.keys("error", "order");
  });

  it("should return the order object with total price deduction, 'fixed' voucher type, 'product' target", () => {
    const result = applyVoucher(
      { ...order, totalPrice: 10 },
      { ...voucher, type: "fixed", target: "product", amount: 1 }
    );

    expect(result).to.include.keys("totalPrice");
    expect(result.totalPrice).to.equal(9);
  });

  it("should return the order object with total price deduction, 'fixed' voucher type, 'category' target", () => {
    const result = applyVoucher(
      { ...order, totalPrice: 10 },
      { ...voucher, type: "fixed", amount: 1 }
    );

    expect(result).to.include.keys("totalPrice");
    expect(result.totalPrice).to.equal(9);
  });

  it("should return the order object with total price deduction, 'percentage' voucher type, 'product' target", () => {
    const result = applyVoucher(
      { ...order, totalPrice: 10 },
      { ...voucher, type: "percentage", target: "product", amount: 50 }
    );

    expect(result).to.include.keys("totalPrice");
    expect(result.totalPrice).to.equal(5);
  });

  it("should return the order object with total price deduction, 'percentage' voucher type, 'category' target", () => {
    const result = applyVoucher(
      { ...order, totalPrice: 10 },
      {
        ...voucher,
        type: "percentage",
        target: "category",
        amount: 50
      }
    );

    expect(result).to.include.keys("totalPrice");
    expect(result.totalPrice).to.equal(5);
  });
});
