import { stepTitle } from "./step-title";
import { nav } from "./nav";
import { stepIndicator } from "./step-indicator";

export const header = () => /* html */ `
  <div class="header">
    ${[stepTitle(), nav(), stepIndicator()].join("")}
  </div>
`;
