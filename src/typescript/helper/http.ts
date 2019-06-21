import { mocks, MocksValue } from "../utils";

export const getModelData = <T>(model: string): Promise<MocksValue> => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(mocks[model]);
    }, Math.random() * 1500)
  );
};
