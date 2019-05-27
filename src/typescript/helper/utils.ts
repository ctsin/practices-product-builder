export const on = (
  element: string,
  evt: keyof DocumentEventMap,
  fn: (event: Event) => any,
  captureOrOptoins?: boolean | AddEventListenerOptions
): any => {
  const matches = (eventTarget: EventTarget) =>
    !!(eventTarget as HTMLElement).matches(element);

  const delegatorFn = (event: Event) => {
    const { target } = event;

    return matches(target) && fn.call(target, event);
  };

  document.addEventListener(evt, delegatorFn, captureOrOptoins);

  return delegatorFn;
};
