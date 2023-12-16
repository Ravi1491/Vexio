import model from "../../models";
const storeProductModel = model.store_product;

export const findOne = async (payload) => {
  const stores = await storeProductModel.findOne({
    where: payload,
  });

  return stores;
};

export async function bulkCreateStoreProducts(payload) {
  try {
    return storeProductModel.bulkCreate(payload);
  } catch (error) {
    console.error("Error", error.message);
  }
}
