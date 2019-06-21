import { CustomEvents } from "../helper";
import { isDocument } from ".";

type EventType = keyof DocumentEventMap;

type ProxyAddEventListener = (
  events: EventType | CustomEvents,
  selector: string,
  listener: EventListener,
  options?: AddEventListenerOptions | boolean
) => EventListener;

type ProxyRemoveEventListener = (
  events: EventType | CustomEvents,
  listener: EventListener,
  options?: AddEventListenerOptions | boolean
) => void;

type $DocumentMethods = {
  on: ProxyAddEventListener;
  off: ProxyRemoveEventListener;
};

type $DOMManipulation = (
  html: string,
  force?: boolean
) => ElementsAnd$DOMMethods;
type $DOMTravel = () => (Element | null)[];
type $StyleClass = (
  classNames: string,
  force?: boolean
) => ElementsAnd$DOMMethods;

type ElementsAnd$DOMMethods = { elements: NodeList } & Record<
  "before" | "after" | "prepend" | "append" | "replace",
  $DOMManipulation
> &
  Record<"addClass" | "removeClass" | "toggleClass", $StyleClass> &
  Record<"prev" | "next", $DOMTravel> &
  $DocumentMethods;

export function $(selector: Document): $DocumentMethods;
export function $(
  selector: string,
  parentNode?: Document
): ElementsAnd$DOMMethods;
export function $(
  selector: Document | string,
  parentNode = document
): $DocumentMethods | ElementsAnd$DOMMethods {
  const on: ProxyAddEventListener = (
    events,
    selector,
    listener,
    options = false
  ) => {
    const delegatorFn: EventListener = event => {
      const { target } = event;

      (target as HTMLElement)!.matches(selector) &&
        listener.call(target, event);
    };

    const handler = isDocument(selector) ? listener : delegatorFn;

    document.addEventListener(events, handler, options);

    return handler;
  };

  const off: ProxyRemoveEventListener = (events, listener, options) => {
    document.removeEventListener(events, listener, options);
  };

  if (isDocument(selector)) return { on, off };

  const elements = parentNode.querySelectorAll(selector);

  const before: $DOMManipulation = (html, force = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("beforebegin", html);
      });

    return DOMMethodsAndProperties;
  };

  const after: $DOMManipulation = (html, force = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("afterend", html);
      });

    return DOMMethodsAndProperties;
  };

  const prepend: $DOMManipulation = (html, force = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("afterbegin", html);
      });

    return DOMMethodsAndProperties;
  };

  const append: $DOMManipulation = (html, force = true) => {
    force &&
      elements.forEach(el => {
        el.insertAdjacentHTML("beforeend", html);
      });

    return DOMMethodsAndProperties;
  };

  const replace: $DOMManipulation = (html, force = true) => {
    force &&
      elements.forEach(el => {
        el.innerHTML = html;
      });

    return DOMMethodsAndProperties;
  };

  const addClass: $StyleClass = classNames => {
    elements.forEach(el => {
      el.classList.add(classNames);
    });

    return DOMMethodsAndProperties;
  };

  const removeClass: $StyleClass = classNames => {
    elements.forEach(el => {
      el.classList.remove(classNames);
    });

    return DOMMethodsAndProperties;
  };

  const toggleClass: $StyleClass = (classNames, force) => {
    elements.forEach(el => {
      el.classList.toggle(classNames, force);
    });

    return DOMMethodsAndProperties;
  };

  const prev: $DOMTravel = () => {
    const elementsArray = [...elements].map(el => el.previousElementSibling);

    return elementsArray.every(el => el === null) ? [] : elementsArray;
  };
  const next: $DOMTravel = () => {
    const elementsArray = [...elements].map(el => el.nextElementSibling);

    return elementsArray.every(el => el === null) ? [] : elementsArray;
  };

  const DOMMethodsAndProperties = {
    elements,
    before,
    after,
    prepend,
    append,
    replace,
    addClass,
    removeClass,
    toggleClass,
    prev,
    next,
    on,
    off
  };

  return DOMMethodsAndProperties;
}

export const select = (selector: string, root = document): HTMLElement | null =>
  root.querySelector(selector);

export const selectAll = (selector: string, root = document) =>
  root.querySelectorAll(selector);
