import model from "../../models";

const reviewReceivedModel = model.review_receive;
const reviewRequestModel = model.review_request;

export const findOneReceived = async (payload) => {
  const request = await reviewReceivedModel.findOne({
    where: payload,
  });

  return request;
};

export const createReviewReceive = async (payload) => {
  return reviewReceivedModel.create({ ...payload });
};

export const getAllReviewRequests = async (payload) => {
  const reviews = await reviewRequestModel.findAll({
    where: payload
  })

  return reviews;
}