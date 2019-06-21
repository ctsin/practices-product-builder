import { $ } from "../helper";
import { toast } from "./toast";

export const nav = () => {
  const modelNavItemClicked = $(document).on("click", "#model\\@nav", event => {
    event.preventDefault();

    console.log("#model");
  });

  const colorNavItemClicked = $(document).on("click", "#color\\@nav", event => {
    event.preventDefault();

    toast();
  });

  const accessoryNavItemClicked = $(document).on(
    "click",
    "#accessory\\@nav",
    event => {
      event.preventDefault();

      console.log("#accessory");
    }
  );

  const summaryNavItemClicked = $(document).on(
    "click",
    "#summary\\@nav",
    event => {
      event.preventDefault();

      console.log("#summary");
    }
  );

  return /* html */ `
    <div class="header@nav">
      <a id="model@nav" class="header@nav:item" href="#">车型</a>
      <a id="color@nav" class="header@nav:item" href="#">颜色</a>
      <a id="accessory@nav" class="header@nav:item" href="#">选配</a>
      <a id="summary@nav" class="header@nav:item" href="#">概要</a>
    </div>
  `;
};
