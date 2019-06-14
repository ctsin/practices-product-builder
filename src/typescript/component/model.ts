import { $, render, when } from "../helper";
import { color } from "./color";
import { Actions } from "../utils";

export const model = () => {
  $("body").on("change", "#m75", () => {
    when(Actions.m75Selected)(".model", event => console.log(event.type));
  });

  $("body").on("change", "#m90", event => {});

  return /* html */ `
    <div class="active model">
      <div class="model@set">
        <input id="m75" name="model" type="radio" class="hide" />
        <label class="model@label" for="m75">M75</label>
      </div>

      <div class="model@set">
        <input id="m90" name="model" type="radio" class="hide" />
        <label class="model@label" for="m90">M90</label>
      </div>
    </div>
  `;
};
