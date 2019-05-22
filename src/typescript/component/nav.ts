import { onClick } from "../helper/utils";

export const Nav = () => {
  onClick("#model", event => {
    console.log(event.target);
  });

  return /* html */ `
    <ul class="nav@primary">
      <li id="model" class="nav@primary:item">车型</li>
      <li id="color" class="nav@primary:item">颜色</li>
      <li id="accessory" class="nav@primary:item">选配</li>
      <li id="summary" class="nav@primary:item">概要</li>
    </ul>
  `;
};
