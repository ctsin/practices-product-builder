import { $, render, isFirstSectionActived } from "../helper";
import { color } from "./color";
import { m75Selected, modelSelected } from "../utils";

export const model = () => {
  $(document).on("change", "#m75", ({ target }) => {
    m75Selected.fire({ detail: "Hello World" });
  });

  $(document).on("change", "#m90", ({ target }) => {
    const isFirst = isFirstSectionActived(".model");

    modelSelected.fire({ detail: { isFirst } });
  });

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
    <div class="color"></div>
    <div class="accessory"></div>
    <div class="model"></div>
  `;
};
