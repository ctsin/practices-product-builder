import { Actions } from "../utils";

type EventType = keyof DocumentEventMap;

export const noop = () => null;

export const isBoolean = (target: any): target is Boolean =>
  typeof target === "boolean";

export const isEmpty = (val: null | Iterable<any>) =>
  val === null || !(Object.keys(val) || val).length;

export const $ = (selector: string, parentNode = document) => {
  const elements = parentNode.querySelectorAll(selector);

  const before = (html: string, force: boolean = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("beforebegin", html);
      });

    return methods;
  };

  const after = (html: string, force: boolean = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("afterend", html);
      });

    return methods;
  };

  const prepend = (html: string, force: boolean = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("afterbegin", html);
      });

    return methods;
  };

  const append = (html: string, force: boolean = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("beforeend", html);
      });

    return methods;
  };

  const addClass = (classNames: string) => {
    elements.forEach(el => {
      el.classList.add(classNames);
    });

    return methods;
  };

  const removeClass = (classNames: string) => {
    elements.forEach(el => {
      el.classList.remove(classNames);
    });

    return methods;
  };

  const toggleClass = (classNames: string, force?: boolean) => {
    elements.forEach(el => {
      el.classList.toggle(classNames, force);
    });

    return methods;
  };

  const prev = () => {
    const elementsArray = [...elements].map(el => el.previousElementSibling);

    return elementsArray.every(el => el === null) ? [] : elementsArray;
  };
  const next = () => {
    const elementsArray = [...elements].map(el => el.nextElementSibling);

    return elementsArray.every(el => el === null) ? [] : elementsArray;
  };

  const on = (
    events: EventType,
    selector: string,
    listener: EventListener,
    options: AddEventListenerOptions | boolean = false
  ): EventListener => {
    const delegatorFn: EventListener = event => {
      const { target } = event;

      (target as HTMLElement)!.matches(selector) &&
        listener.call(target, event);
    };

    elements.forEach(el => {
      el.addEventListener(events, delegatorFn, options);
    });

    return delegatorFn;
  };

  const off = (events: EventType, listener: EventListener): void => {
    elements.forEach(el => {
      el.removeEventListener(events, listener);
    });
  };

  const methods = {
    before,
    after,
    prepend,
    append,
    addClass,
    removeClass,
    toggleClass,
    prev,
    next,
    on,
    off
  };

  return methods;
};

export const render = (...templates: string[]) => templates.join("");

export const when = (
  events: Actions,
  detail?: any
) => (
  selector: string,
  listener: EventListener,
  addEventListenerOptions?: AddEventListenerOptions
) => {
  const target = document.querySelector(selector);
  if (!target) return noop;

  const fn = (event: Event) =>
    (event.target as HTMLElement).matches(selector) &&
    listener.call(event.target, event);

  document.addEventListener(events, fn, {
    once: true,
    ...addEventListenerOptions
  });

  return target.dispatchEvent(
    new CustomEvent(events, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail
    })
  );
};
