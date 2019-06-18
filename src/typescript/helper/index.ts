import { Actions } from "../utils";

type EventType = keyof DocumentEventMap;

export const noop = () => null;

export const isBoolean = (target: any): target is boolean =>
  typeof target === "boolean";

export const isString = (target: any): target is string =>
  typeof target === "string";

export const isEmpty = (val: null | Iterable<any>) =>
  val === null || !(Object.keys(val) || val).length;

const isDocument = (selector: string | Document): selector is Document =>
  selector instanceof Document;

type ProxyAddEventListener = (
  events: EventType | Actions,
  selector: string,
  listener: EventListener,
  options?: AddEventListenerOptions | boolean
) => EventListener;

type ProxyRemoveEventListener = (
  events: EventType | Actions,
  listener: EventListener,
  options?: AddEventListenerOptions | boolean
) => void;

interface $DocumentMethods {
  on: ProxyAddEventListener;
  off: ProxyRemoveEventListener;
}

type $DOMManipulation = (html: string, force?: boolean) => void;
type $DOMTravel = () => (Element | null)[];
type $StyleClass = (classNames: string, force?: boolean) => void;

type $DOMMethods = Record<
  "before" | "after" | "prepend" | "append",
  $DOMManipulation
> &
  Record<"addClass" | "removeClass" | "toggleClass", $StyleClass> &
  Record<"prev" | "next", $DOMTravel> &
  $DocumentMethods;

export function $(selector: Document): $DocumentMethods;
export function $(selector: string, parentNode?: Document): $DOMMethods;
export function $(
  selector: Document | string,
  parentNode = document
): $DocumentMethods | $DOMMethods {
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

type Render = (...templates: string[]) => string;
export const render: Render = (...templates) => templates.join("");

export const when = (events: Actions) => (
  selector: string,
  {
    bubbles = true,
    cancelable = true,
    composed = true,
    detail
  }: {
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    detail?: any;
  } = {
    bubbles: true,
    cancelable: true,
    composed: true
  }
) => {
  const target = document.querySelector(selector);

  if (!target) throw new Error(`"${selector}" 选择器未能命中任何元素！`);

  return target.dispatchEvent(
    new CustomEvent(events, {
      bubbles,
      cancelable,
      composed,
      detail
    })
  );
};
