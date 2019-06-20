import { CustomEvents } from "../utils";

export const when = (events: CustomEvents) => {
  const on = (
    handdler: (event: CustomEventInit) => void,
    options?: boolean | AddEventListenerOptions
  ) => document.addEventListener(events, handdler, options);

  const fire = (
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

  return { on, fire };
};

export const lala = () => console.log(`LaLa`);
export * from "./http";
export * from "./is";
export * from "./dom";
export * from "./fn";
