import { $, render } from "../helper";
import { color } from "./color";
import { m75Selected } from "../utils/events";

export const model = () => {
  $(document).on("change", "#m75", ({ target }) => {
    m75Selected(target!, { detail: "Hello World" });
  });

  $(document).on(
    "m75Selected",
    "#m75",
    ({ detail = "Hello World" }: CustomEventInit) => console.log(detail)
  );

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
