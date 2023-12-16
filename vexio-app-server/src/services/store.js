import model from "../../models";

const storeModel = model.store;

export const findAllStores = async (payload) => {
  const stores = await storeModel.findAndCountAll({
    where: payload,
  });

  return stores;
};
