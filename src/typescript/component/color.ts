export const color = (...colors: string[]) => {
  return /* html */ `
    <div class="color">
      ${colors
        .map(
          c => /* html */ `
            <div class="color@set">
              <input type="radio" id="${c}" name="color" class="hide" />
              <label for="${c}" class="color@label" style="color: ${c}"></label>
            </div>
          `
        )
        .join("")}
    </div>
  `;
};
