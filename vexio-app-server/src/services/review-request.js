import model from "../../models";

const reviewRequestModel = model.review_request;

export const findOneRequest = async (payload) => {
  const request = await reviewRequestModel.findOne({
    where: payload,
  });

  return request;
};

export const createRequest = async (payload) => {
  return reviewRequestModel.create({ ...payload });
};