import { onClick } from "../helper/utils";

export const Nav = () => {
  const modelNavItemClickHandler = onClick("#model", ({ preventDefault }) => {
    event.preventDefault();

    console.log("#model");
  });

  const colorNavItemClickHandler = onClick("#color", ({ preventDefault }) => {
    preventDefault();

    console.log("#color");
  });

  const accessoryNavItemClickHandler = onClick(
    "#accessory",
    ({ preventDefault }) => {
      event.preventDefault();

      console.log("#accessory");
    }
  );

  const summaryNavItemClickHandler = onClick(
    "#summary",
    ({ preventDefault }) => {
      event.preventDefault();

      console.log("#summary");
    }
  );

  return /* html */ `
    <ul class="nav@primary">
      <li id="model" class="nav@primary:item"><a href="#">车型</a></li>
      <li id="color" class="nav@primary:item"><a href="#">颜色</a></li>
      <li id="accessory" class="nav@primary:item"><a href="#">选配</a></li>
      <li id="summary" class="nav@primary:item"><a href="#">概要</a></li>
    </ul>
  `;
};
