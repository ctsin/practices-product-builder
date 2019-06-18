import { $, render, when } from "../helper";
import { color } from "./color";
import { Actions } from "../utils";

export const m75Selected = when("m75Selected");

export const model = () => {
  $(document).on("change", "#m75", () => {
    m75Selected(".model");
  });

  $(document).on("m75Selected", ".model", event => console.log(event.target));

  $(document).on("change", "#m90", event => {});

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
