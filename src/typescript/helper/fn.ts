export const noop = () => null;

export const err = (message: string = "发生了未知错误！"): never => {
  throw new Error(message);
};

export const isFirstSectionActived = (
  selector: string,
  sign = "active",
  root = document
) => {
  const el = root.querySelector(selector);

  if (!el) return err(`"${selector}" 未命中任何元素！`);

  const parent = el.parentElement;

  if (!parent) return err(`不支持在 "documentElement" 元素上使用此方法！`);

  const firstChild = parent.firstElementChild;

  if (!firstChild) return err(`未找到任何子元素！`);

  return firstChild.classList.contains(sign);
};

type Render = (...templates: string[]) => string;
export const render: Render = (...templates) => templates.join("");
