import { $ } from "../helper/utils";

export const model = () => {
  const m90Changed = $("body").on("change", "#m90", event => {
    console.log(event.target);
  });

  const m75Changed = $("body").on("change", "#m75", event => {
    console.log(event.target);
  });

  return /* html */ `
    <div class="active model">
      <div class="model@set">
        <input class="model@input" id="m75" name="model" type="radio" />
        <label class="model@label" for="m75">M75</label>
      </div>

      <div class="model@set">
        <input class="model@input" id="m90" name="model" type="radio" />
        <label class="model@label" for="m90">M90</label>
      </div>
    </div>
  `;
};
