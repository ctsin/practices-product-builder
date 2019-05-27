import { on } from "../helper/utils";

export const Nav = () => {
  const modelNavItemClickHandler = on("#model", "click", event => {
    event.preventDefault();

    console.log("#model");
  });

  const colorNavItemClickHandler = on("#color", "click", event => {
    event.preventDefault();

    console.log("#color");
  });

  const accessoryNavItemClickHandler = on("#accessory", "click", event => {
    event.preventDefault();

    console.log("#accessory");
  });

  const summaryNavItemClickHandler = on("#summary", "click", event => {
    event.preventDefault();

    console.log("summary");
  });

  return /* html */ `
    <ul class="nav@primary">
      <li id="model" class="nav@primary:item"><a href="#">车型</a></li>
      <li id="color" class="nav@primary:item"><a href="#">颜色</a></li>
      <li id="accessory" class="nav@primary:item"><a href="#">选配</a></li>
      <li id="summary" class="nav@primary:item"><a href="#">概要</a></li>
    </ul>
  `;
};
