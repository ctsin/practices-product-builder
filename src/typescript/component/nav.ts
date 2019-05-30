import { on } from "../helper/utils";
import { toast } from "./toast";

export const nav = () => {
  const modelNavItemClickHandler = on("#model", "click", event => {
    event.preventDefault();

    console.log("#model");
  });

  const colorNavItemClickHandler = on("#color", "click", event => {
    event.preventDefault();

    toast();
  });

  const accessoryNavItemClickHandler = on("#accessory", "click", event => {
    event.preventDefault();

    console.log("#accessory");
  });

  const summaryNavItemClickHandler = on("#summary", "click", event => {
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
