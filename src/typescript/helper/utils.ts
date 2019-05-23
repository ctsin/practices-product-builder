type Opts = Partial<{
  capture: boolean;
  once: boolean;
}>;

type SyntheticEventFactory = {
  (
    eventType: string,
    element: string,
    fn: (event: Event) => void,
    opts: Opts
  ): any;
};

type SyntheticEvent = {
  (
    element: string,
    fn: (event: Event) => void,
    opts?: Opts
  ): SyntheticEventFactory;
};

const on: SyntheticEventFactory = (
  eventType,
  element,
  fn,
  { capture, once }
) => {
  const matches = (eventTarget: EventTarget) =>
    !!(eventTarget as HTMLElement).matches(element);

  const delegatorFn = (event: Event) => {
    const { target } = event;

    return matches(target) && fn.call(target, event);
  };

  document.addEventListener(eventType, delegatorFn, {
    capture: !!capture,
    once: !!once
  });

  return delegatorFn;
};

export const onClick: SyntheticEvent = (element, fn, opts = {}) =>
  on("click", element, fn, opts);
