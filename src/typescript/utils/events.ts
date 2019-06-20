import { when, lala } from "../helper";

export type CustomEvents = "m75Selected" | "m90Selected" | "modelSelected";
console.log(lala());

export const m75Selected = when("m75Selected");
export const modelSelected = when("modelSelected");
