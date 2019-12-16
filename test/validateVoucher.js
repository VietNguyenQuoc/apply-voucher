const expect = require("chai").expect;
const applyVoucher = require("../applyVoucher.js");

describe("Test voucher validation", () => {
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

  it("should throw error when no argument passed", () => {
    const applied = () => {
      applyVoucher();
    };

    expect(applied).to.throw();
  });

  it("should throw error when just 1 argument passed", () => {
    const applied = () => {
      applyVoucher(1);
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher doesnt have id props", () => {
    const applied = () => {
      applyVoucher(order, 1);
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher id is not a number", () => {
    const applied = () => {
      applyVoucher(order, { id: "a" });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher productId is not number", () => {
    const applied = () => {
      applyVoucher(order, { id: 1, eligibleProductIds: ["a"] });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher doesnt have type props", () => {
    const applied = () => {
      applyVoucher(order, { id: 1, eligibleProductIds: [1] });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher type is not a string", () => {
    const applied = () => {
      applyVoucher(order, { id: 1, eligibleProductIds: [1], type: 1 });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher type is neither 'percentage' nor 'fixed'", () => {
    const applied = () => {
      applyVoucher(order, { id: 1, eligibleProductIds: [1], type: "a" });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher doesnt have amount props", () => {
    const applied = () => {
      applyVoucher(order, {
        id: 1,
        eligibleProductIds: [1],
        type: "percentage"
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher deduction amount is not a number", () => {
    const applied = () => {
      applyVoucher(order, {
        id: 1,
        eligibleProductIds: [1],
        type: "percentage",
        amount: "a"
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher deduction amount is negative", () => {
    const applied = () => {
      applyVoucher(order, {
        id: 1,
        eligibleProductIds: [1],
        type: "percentage",
        amount: -1
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when voucher type is percentage amount is bigger than 100%", () => {
    const applied = () => {
      applyVoucher(order, {
        id: 1,
        eligibleProductIds: [1],
        type: "percentage",
        amount: 101
      });
    };

    expect(applied).to.throw();
  });
});
