import model from "../../models";

const reviewReceivedModel = model.review_receive;

export const findOneReceived = async (payload) => {
  const request = await reviewReceivedModel.findOne({
    where: payload,
  });

  return request;
};

export const createReviewReceive = async (payload) => {
  return reviewReceivedModel.create({ ...payload });
};
