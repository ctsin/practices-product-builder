type EventType = keyof DocumentEventMap;

type On = (
  element: string,
  eventType: EventType,
  fn: EventListener,
  captureOrOptoins?: boolean | AddEventListenerOptions
) => any;

export const isBoolean = (target: any) => typeof target === "boolean";

export const $ = (selector: string, parentNode = document) => {
  const element = parentNode.querySelectorAll(selector);

  const before = (html: string) => {
    element.forEach(node => {
      node.insertAdjacentHTML("beforebegin", html);
    });
  };

  const after = (html: string) => {
    element.forEach(node => {
      node.insertAdjacentHTML("afterend", html);
    });
  };

  const prepend = (html: string) => {
    element.forEach(node => {
      node.insertAdjacentHTML("afterbegin", html);
    });
  };

  const append = (html: string) => {
    element.forEach(node => {
      node.insertAdjacentHTML("beforeend", html);
    });
  };

  type On = (
    events: EventType,
    selector: string,
    listener: EventListener
  ) => EventListener;

  const on: On = (events, selector, listener) => {
    const delegatorFn: EventListener = event => {
      const { target } = event;

      (target as HTMLElement)!.matches(selector) &&
        listener.call(target, event);
    };

    element.forEach(node => {
      node.addEventListener(events, delegatorFn);
    });

    return delegatorFn;
  };

  type Off = (event: EventType, listener: EventListener) => void;

  const off: Off = (events, listener) => {
    element.forEach(node => {
      node.removeEventListener(events, listener);
    });
  };

  return { before, after, prepend, append, on, off };
};

export const render = (...templates: string[]) => templates.join("");
