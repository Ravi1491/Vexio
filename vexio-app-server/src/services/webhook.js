import model from "../../models";

const webhookModel = model.webhook;

export const findOneWebhook = async (payload) => {
  const webhook = await webhookModel.findOne({
    where: payload,
  });

  return webhook;
};

export const findAllWebhooks = async (payload) => {
  const webhooks = await webhookModel.findAll({
    where: payload,
  });

  return webhooks;
};
