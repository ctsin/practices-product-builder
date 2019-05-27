type StepIndicator = () => string;

export const stepIndicator: StepIndicator = () => /* html */ `
    <div class="header@indicator" data-current="1" data-total="4"></div>
  `;
