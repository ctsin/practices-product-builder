import { render, $ } from "../helper";

import { header } from "./header";
import { footer } from "./footer";
import { body } from "./body";

$("#root").append(render(header(), body(), footer()));
