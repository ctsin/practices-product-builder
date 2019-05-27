import { header } from "./header";
import { model } from "./model";
import { render } from "../helper/utils";

document.getElementById("root").innerHTML = render(header(), model());
