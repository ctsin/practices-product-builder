type EventType = keyof DocumentEventMap;

type On = (
  element: string,
  eventType: EventType,
  fn: EventListener,
  captureOrOptoins?: boolean | AddEventListenerOptions
) => any;

export const on: On = (element, evt, fn, captureOrOptoins = false): any => {
  const matches = (eventTarget: EventTarget) =>
    !!(eventTarget as HTMLElement).matches(element);

  const delegatorFn = (event: Event) => {
    const { target } = event;

    return matches(target!) && fn.call(target, event);
  };

  document.addEventListener(evt, delegatorFn, captureOrOptoins);

  return delegatorFn;
};

type Off = (eventType: EventType, fn: EventListener) => void;

export const off: Off = (eventType, fn) =>
  document.removeEventListener(eventType, fn);

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

  return { before, after, prepend, append };
};

export const render = (...templates: string[]) => templates.join("");
