import { stepTitle } from "./step-title";
import { nav } from "./nav";
import { stepIndicator } from "./step-indicator";
import { render } from "../helper/utils";

export const header = () => /* html */ `
  <div class="header">
    ${render(stepTitle(), nav(), stepIndicator())}
  </div>
`;
