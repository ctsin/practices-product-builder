export const isBoolean = (target: any): target is boolean =>
  typeof target === "boolean";

export const isString = (target: any): target is string =>
  typeof target === "string";

export const isEmpty = (val: null | Iterable<any>) =>
  val === null || !(Object.keys(val) || val).length;

export const isDocument = (selector: string | Document): selector is Document =>
  selector instanceof Document;
