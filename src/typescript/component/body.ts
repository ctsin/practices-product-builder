import { render } from "../helper";

import { model } from "./model";
import { color } from "./color";

export const body = () => {
  return /* html */ `
    <div class="body">
      ${render(model())}
    </div>
  `;
};
