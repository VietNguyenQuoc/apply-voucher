const expect = require("chai").expect;
const applyVoucher = require("../applyVoucher.js");

describe("Test order validation", () => {
  const order = {
    id: 1,
    items: [
      {
        id: 1,
        price: 1,
        product: { id: 1, name: "a" },
        description: "a",
        quantity: 1
      }
    ],
    totalPrice: 1
  };

  const voucher = {
    id: 1,
    productId: 1,
    type: "percentage",
    amount: 1
  };

  it("should throw error when the order dont have id props", () => {
    const applied = () => {
      applyVoucher(1);
    };

    expect(applied).to.throw();
  });

  it("should throw error when the orderId props is not a number", () => {
    const applied = () => {
      applyVoucher({ id: "a" });
    };

    expect(applied).to.throw();
  });

  it("should throw error when the order doesnt have items props", () => {
    const applied = () => {
      applyVoucher({ id: 1 });
    };

    expect(applied).to.throw();
  });

  it("should throw error when the items is empty", () => {
    const applied = () => {
      applyVoucher({ id: 1, items: [] });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item doesnt have id props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ a: 1 }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a itemId is not a number", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: "a" }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item doesnt have price props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1 }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item price is not a number", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1, price: "a" }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item doesnt have productId props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1, price: 1 }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item product doesnt have id props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1, price: 1, product: {} }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item product id is not a number", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1, price: 1, product: { id: "a" } }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item product doesnt have name props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [{ id: 1, price: 1, product: { id: 1 } }]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item product name is not a string", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: 1 }
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item product name is longer than 255 character", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: Array(260).join("a") }
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item doesnt have desciption props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: "a" }
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item doesnt have quantity props", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: "a" },
            description: "a"
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item quantity is not a number", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: "a" },
            description: "a",
            quantity: "a"
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when a item quantity is negative", () => {
    const applied = () => {
      applyVoucher({
        id: 1,
        items: [
          {
            id: 1,
            price: 1,
            product: { id: 1, name: "a" },
            description: "a",
            quantity: -1
          }
        ]
      });
    };

    expect(applied).to.throw();
  });

  it("should throw error when order doesnt have totalPrice props", () => {
    const applied = () => {
      applyVoucher(_.omit(order, "totalPrice"), voucher);
    };

    expect(applied).to.throw();
  });
});
