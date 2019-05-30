type ToastOptions = Partial<{
  content: string;
  icon: string;
  closable: boolean;
}>;

export const toast = (toastOptions: ToastOptions = {}) => {
  const {
    content = "抱歉！我们遇到了一个未知错误。",
    icon = "alert",
    closable = true
  } = toastOptions;

  return /* html */ `
    <div
      class="toast"
      data-content="${content}"
      data-icon="${icon}"
      data-clos="${closable}"
    ></div>
  `;
};
