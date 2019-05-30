type ToastOptions = Partial<{
  content: string;
  icon: string;
  closable: boolean;
  root: string;
  duration: number;
}>;

export const toast = (toastOptions: ToastOptions = {}) => {
  const {
    content = "抱歉！我们遇到了一个未知错误。",
    icon = "alert",
    closable = true,
    root = "body",
    duration = 3000
  } = toastOptions;

  const toasts = /* html */ `<div class="toasts"></div>`;

  const inner = /* html */ `
      <div
        class="toast"
        data-content="${content}"
        data-icon="${icon}"
        data-clos="${closable}"
      ></div>
  `;

  const rootElement = document.querySelector(root)!;

  !document.querySelector(".toasts") &&
    rootElement.insertAdjacentHTML("beforeend", toasts);

  const toastsElement = document.querySelector(".toasts");
  toastsElement!.insertAdjacentHTML("beforeend", inner);

  const timeout = setTimeout(() => {
    document.querySelector(".toast")!.remove();
  }, duration);
};
