import { m75Selected, modelSelected } from "../utils";
import { $, render, isFirstSectionActived, getModelData } from "../helper";
import { color } from "./color";

export const model = () => {
  const updateProductContent = async (el: HTMLElement) => {
    const data = await getModelData(el.dataset.model!);

    $(".color")
      .html(render(color(...data.color)))
      .addClass("active")
      .prev()
      .forEach(el => el && el.classList.remove("active"));
  };

  $(document).on("change", "#m75", ({ target }) => {
    m75Selected.fire({ detail: "Hello World" });

    updateProductContent(target as HTMLElement);
  });

  $(document).on("change", "#m90", ({ target }) => {
    const isFirst = isFirstSectionActived(".model");
    modelSelected.fire({ detail: { isFirst } });

    updateProductContent(target as HTMLElement);
  });

  return /* html */ `
    <div class="active model">
      <div class="model@set">
        <input id="m75" data-model="m75" name="model" type="radio" class="hide" />
        <label class="model@label" for="m75">M75</label>
      </div>

      <div class="model@set">
        <input id="m90" data-model="m90" name="model" type="radio" class="hide" />
        <label class="model@label" for="m90">M90</label>
      </div>
    </div>
    <div class="color"></div>
    <div class="accessory"></div>
    <div class="model"></div>
  `;
};
