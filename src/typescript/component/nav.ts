import { $ } from "../helper";
import { toast } from "./toast";

export const nav = () => {
  const modelNavItemClicked = $(document).on("click", "#model", event => {
    event.preventDefault();

    console.log("#model");
  });

  const colorNavItemClicked = $(document).on("click", "#color", event => {
    event.preventDefault();

    toast();
  });

  const accessoryNavItemClicked = $(document).on(
    "click",
    "#accessory",
    event => {
      event.preventDefault();

      console.log("#accessory");
    }
  );

  const summaryNavItemClicked = $(document).on("click", "#summary", event => {
    event.preventDefault();

    console.log("#summary");
  });

  return /* html */ `
    <div class="header@nav">
      <a id="model" class="header@nav:item" href="#">车型</a>
      <a id="color" class="header@nav:item" href="#">颜色</a>
      <a id="accessory" class="header@nav:item" href="#">选配</a>
      <a id="summary" class="header@nav:item" href="#">概要</a>
    </div>
  `;
};
