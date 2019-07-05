export type CustomEvents =
  | "m75Selected"
  | "m90Selected"
  | "modelSelected"
  | "prevClicked"
  | "nextClicked"
  | "activeUpdated";

export const when = (events: CustomEvents) => {
  const on = (
    handdler: (event: CustomEventInit) => void,
    options?: boolean | AddEventListenerOptions
  ) => document.addEventListener(events, handdler, options);

  const emit = (
    {
      cancelable = true,
      composed = true,
      detail
    }: Partial<{
      cancelable: boolean;
      composed: boolean;
      detail: any;
    }> = {
      cancelable: true,
      composed: true
    }
  ) =>
    document.dispatchEvent(
      new CustomEvent(events, {
        cancelable,
        composed,
        detail
      })
    );

  return { on, emit };
};
