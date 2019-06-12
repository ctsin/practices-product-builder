import { $ } from "../helper/utils";

export const footer = () => {
  $("body").on("click", "#prev", event => {
    const active = $(".active");

    active.prev()
      ? $("#prev").removeClass("hidden") &&
        active
          .removeClass("active")
          .addClass("right-out")
          .prev()
          .forEach(el => {
            if (!el) return;

            el.classList.add("active");
            el.classList.remove("left-out");
          })
      : $("#prev").addClass("hidden");
  });

  return /* html */ `
  <div class="footer">
    <div class="footer@total" data-amount="0"></div>

    <div class="footer@nav">
      <a href="#" id="prev" class="prev hidden" data-title="上一步"></a>
      <a href="#" id="next" class="next" data-title="下一步"></a>
    </div>
  </div>
`;
};
