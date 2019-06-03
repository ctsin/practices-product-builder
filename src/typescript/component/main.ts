import { render } from "../helper/utils";

import { header } from "./header";
import { footer } from "./footer";
import { body } from "./body";

const root = document.querySelector("#root");

root &&
  root.insertAdjacentHTML("beforeend", render(header(), body(), footer()));
