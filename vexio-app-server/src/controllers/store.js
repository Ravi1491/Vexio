import { findAllProducts, findAllStores } from "../services/store";
import logger from "../utils/logger";

export async function getAllStores(req, res) {
  try {
    const email = req.query.email;
    const stores = await findAllStores({ email });

    return res.send({
      count: stores.count,
      data: stores.rows,
    });
  } catch (error) {
    logger.error(error);
  }
}

export async function getAllProducts(req, res) {
  try {
    const email = req.query.email;

    const allStores = await findAllStores({ email });

    const storeIds = await allStores.rows.map(a => a.id);

    const {count, rows} = await findAllProducts({ storeId: storeIds });

    return res.send({
      count,
      data: rows,
    })
  } catch (error) {
    logger.error(error);
  }
}
