const validateOrderAndVoucher = require("./validateOrderAndVoucher");
const _ = require("lodash");

applyVoucher = function(order, voucher) {
  if (arguments.length !== 2) {
    throw new TypeError("Function takes 2 arguments: order and voucher");
  }
  validateOrderAndVoucher(order, voucher);

  if (voucher.target === "category") {
    const ineligibleItems = getIneligibleItems();
    if (ineligibleItems.length !== 0) {
      return {
        error: "Voucher cannot be applied for some item's category",
        order
      };
    } else {
      return orderAfterAppliedVoucher();
    }
  } else if (voucher.target === "product") {
    const ineligibleProducts = getIneligibleProducts();
    if (ineligibleProducts.length !== 0) {
      return {
        error: "Voucher cannot be applied for some items.",
        order
      };
    } else {
      return orderAfterAppliedVoucher();
    }
  }

  function getIneligibleItems() {
    return order.items.filter(
      item => item.categoryId !== voucher.eligibleCategoryId
    );
  }

  function getIneligibleProducts() {
    const orderProductIds = order.items.map(item => item.productId);
    return _.difference(voucher.eligibleProductIds, orderProductIds);
  }

  function orderAfterAppliedVoucher() {
    if (voucher.type === "fixed") {
      return { ...order, totalPrice: order.totalPrice - voucher.amount };
    } else if (voucher.type === "percentage") {
      return {
        ...order,
        totalPrice: order.totalPrice * (1 - voucher.amount / 100)
      };
    }
  }
};

module.exports = applyVoucher;
