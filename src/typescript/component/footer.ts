import { $, select } from "../helper";
import { modelSelected } from "../utils";

export const footer = () => {
  $(document).on("click", "#prev", event => {});

  modelSelected.on(({ detail: { isFirst } }) => {
    isFirst && select("#prev")!.classList.remove("hidden");
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
