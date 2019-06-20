import { mocks } from "../utils";

export const getModelData = (model: string) => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(mocks[model]);
    }, Math.random() * 1500)
  );
};
