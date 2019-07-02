import { CustomEvents } from "../helper";
import { isDocument } from "./is";
import { err } from "./fn";

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

type EmitCustomEvent = (
  events: CustomEvents,
  options?: CustomEventInit
) => boolean;

type $DocumentMethods = {
  on: ProxyAddEventListener;
  off: ProxyRemoveEventListener;
  emit: EmitCustomEvent;
};

type $DOMManipulation = (html: string, force?: boolean) => $DOMMethods;

type $DOMTravel = () => Element | null;

type $StyleClass = (classNames: string, force?: boolean) => $DOMMethods;

type $GetElement = { get: () => Element | null };

export type $DOMMethods = $GetElement &
  Record<"before" | "after" | "prepend" | "append" | "html", $DOMManipulation> &
  Record<"addClass" | "removeClass" | "toggleClass", $StyleClass> &
  Record<"prev" | "next", $DOMTravel> &
  $DocumentMethods;

interface Dollar {
  (selector: string, parentNode?: Document): $DOMMethods;
  on: ProxyAddEventListener;
  off: ProxyRemoveEventListener;
  emit: EmitCustomEvent;
}

export const $ = ((selector, parentNode = document) => {
  const element = parentNode.querySelector(selector);

  if (!element) return err(`"${element}" 未命中任何元素！`);

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

  const emit: EmitCustomEvent = (events, options) =>
    document.dispatchEvent(new CustomEvent(events, options));

  const get = () => element;

  const before: $DOMManipulation = (html, force = true) => {
    force && element.insertAdjacentHTML("beforebegin", html);

    return DOMMethodsAndProperties;
  };

  const after: $DOMManipulation = (html, force = true) => {
    force && element.insertAdjacentHTML("afterend", html);

    return DOMMethodsAndProperties;
  };

  const prepend: $DOMManipulation = (html, force = true) => {
    force && element.insertAdjacentHTML("afterbegin", html);

    return DOMMethodsAndProperties;
  };

  const append: $DOMManipulation = (html, force = true) => {
    force && element.insertAdjacentHTML("beforeend", html);

    return DOMMethodsAndProperties;
  };

  const html: $DOMManipulation = (html, force = true) => {
    force && (element.innerHTML = html);

    return DOMMethodsAndProperties;
  };

  const addClass: $StyleClass = classNames => {
    element.classList.add(classNames);

    return DOMMethodsAndProperties;
  };

  const removeClass: $StyleClass = classNames => {
    element.classList.remove(classNames);

    return DOMMethodsAndProperties;
  };

  const toggleClass: $StyleClass = (classNames, force) => {
    element.classList.toggle(classNames, force);

    return DOMMethodsAndProperties;
  };

  const prev: $DOMTravel = () => element.previousElementSibling;

  const next: $DOMTravel = () => element.nextElementSibling;

  const DOMMethodsAndProperties = {
    get,
    before,
    after,
    prepend,
    append,
    html,
    addClass,
    removeClass,
    toggleClass,
    prev,
    next,
    on,
    off,
    emit
  };

  return DOMMethodsAndProperties;
}) as Dollar;

$.on = (events, selector, listener, options = false) => {
  const delegatorFn: EventListener = event => {
    const { target } = event;

    (target as HTMLElement)!.matches(selector) && listener.call(target, event);
  };

  const handler = isDocument(selector) ? listener : delegatorFn;

  document.addEventListener(events, handler, options);

  return handler;
};

$.off = (events, listener, options) => {
  document.removeEventListener(events, listener, options);
};

$.emit = (events, options) =>
  document.dispatchEvent(new CustomEvent(events, options));

export const select = (selector: string, root = document): HTMLElement | null =>
  root.querySelector(selector);

export const selectAll = (selector: string, root = document) =>
  root.querySelectorAll(selector);
