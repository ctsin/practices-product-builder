export type MocksValue = { color: string[] };
export type Mocks = { [key: string]: MocksValue };

export const mocks: Mocks = {
  m75: { color: ["red", "blue"] },
  m90: { color: ["pink", "brown"] }
};
