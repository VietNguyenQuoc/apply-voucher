const Joi = require("joi");

const itemSchema = Joi.object().keys({
  id: Joi.number().required(),
  productId: Joi.number().required(),
  productName: Joi.string().max(255).required(), // prettier-ignore
  categoryName: Joi.string().required(),
  categoryId: Joi.number().required(),
  productDescription: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number()
    .min(0)
    .required()
});

const orderSchema = Joi.object().keys({
  id: Joi.number().required(),
  items: Joi.array().items(itemSchema).min(1).required(), // prettier-ignore
  totalPrice: Joi.required()
});

const voucherSchema = Joi.object().keys({
  id: Joi.number().required(),
  eligibleProductIds: Joi.array().items(Joi.number()),
  eligibleCategoryId: Joi.number(),
  amount: Joi.number()
    .min(0)
    .required(),
  type: Joi.string()
    .valid("percentage", "fixed")
    .required(),
  target: Joi.string()
    .valid("product", "category")
    .required()
});

const validateOrderAndVoucher = (order, voucher) => {
  const isOrderValid = Joi.validate(order, orderSchema);
  if (isOrderValid.error)
    throw new TypeError(isOrderValid.error.details[0].message);

  const isVoucherValid = Joi.validate(voucher, voucherSchema);
  if (isVoucherValid.error) {
    throw new TypeError(isVoucherValid.error.details[0].message);
  }

  if (voucher.type === "percentage" && voucher.amount > 100) {
    throw new TypeError("Invalid voucher discount amount");
  }
};

module.exports = validateOrderAndVoucher;
