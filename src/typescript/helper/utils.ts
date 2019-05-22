type SyntheticEventFactory = {
  (
    eventType: string,
    element: string,
    fn: (event: Event) => void,
    opts: Partial<{
      capture: boolean;
      once: boolean;
    }>
  ): void;
};

type SyntheticEvent = {
  (
    element: string,
    fn: (event: Event) => void,
    opts?: Partial<{
      capture: boolean;
      once: boolean;
    }>
  ): void;
};

const on: SyntheticEventFactory = (
  eventType,
  element,
  fn,
  { capture, once }
) => {
  const matches = (eventTarget: EventTarget) =>
    !!(eventTarget as HTMLElement).matches(element);

  const delegatorFn = ({ target }: Event) =>
    matches(target) && fn.call(target, event);

  document.addEventListener(eventType, delegatorFn, {
    capture: !!capture,
    once: !!once
  });

  return delegatorFn;
};

export const onClick: SyntheticEvent = (element, handler, opts = {}) =>
  on("click", element, handler, opts);
