import model from "../../models";

const storeModel = model.store;
const storeProductModel = model.store_product;

export const findAllStores = async (payload) => {
  const stores = await storeModel.findAndCountAll({
    where: payload,
  });

  return stores;
};

export const findAllProducts = async () => {
  const products = await storeProductModel.findAndCountAll();

  return products;
};

export const findOneStore = async (payload) => {
  const stores = await storeModel.findOne({
    where: payload,
  });

  return stores;
};

export async function createStore(payload) {
  try {
    const storeData = await storeModel.create({
      storeName: payload.shop,
      email: payload.email,
      accessToken: "",
      isAppInstall: false,
    });

    console.log("Store created successfully", storeData);
  } catch (error) {
    console.error("Error while creating store", error.message);
  }
}

export async function updateStore(payload, condition) {
  try {
    const storeData = await storeModel.update(payload, { where: condition });

    console.log("Store updated successfully", storeData);
    return;
  } catch (error) {
    console.error("Error while updating store", error.message);
  }
}

export async function deleteStore(condition) {
  try {
    await storeModel.destroy({ where: condition });

    console.log("Store delete successfully");
    return;
  } catch (error) {
    console.error("Error while deleting store", error.message);
  }
}
