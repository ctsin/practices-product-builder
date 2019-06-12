import { $, render } from "../helper/utils";
import { color } from "./color";

export const model = () => {
  const m75Changed = $("body").on("change", "#m75", event => {});

  const m90Changed = $("body").on("change", "#m90", event => {});

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
