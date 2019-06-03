import { render } from "../helper/utils";

import { nav } from "./nav";
import { stepTitle } from "./step-title";
import { stepIndicator } from "./step-indicator";

export const header = () => /* html */ `
  <div class="header">
    ${render(stepTitle(), nav(), stepIndicator())}
  </div>
`;
