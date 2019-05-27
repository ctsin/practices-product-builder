type EventType = keyof DocumentEventMap;

type On = (
  element: string,
  eventType: EventType,
  fn: EventListener,
  captureOrOptoins?: boolean | AddEventListenerOptions
) => any;

export const on: On = (element, evt, fn, captureOrOptoins): any => {
  const matches = (eventTarget: EventTarget) =>
    !!(eventTarget as HTMLElement).matches(element);

  const delegatorFn = (event: Event) => {
    const { target } = event;

    return matches(target) && fn.call(target, event);
  };

  document.addEventListener(evt, delegatorFn, captureOrOptoins);

  return delegatorFn;
};

type Off = (
  eventType: EventType,
  fn: EventListenerOrEventListenerObject
) => void;

export const off: Off = (eventType, fn) =>
  document.removeEventListener(eventType, fn);

export const render = (...templates: string[]) => templates.join("");
