import model from "../../models";

const reviewRequestModel = model.review_request;

export const findOneRequest = async (payload) => {
  const request = await reviewRequestModel.findOne({
    where: payload,
  });

  return request;
};

export const findAllRequests = async (payload) => {
  const requests = await reviewRequestModel.findAll({
    where: payload,
  });

  return requests;
};

export const createRequest = async (payload) => {
  return reviewRequestModel.create({ ...payload });
};

export const updateRequest = async (payload, condition) => {
  return reviewRequestModel.update(payload, {
    where: condition,
  });
};
