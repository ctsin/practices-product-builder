import { render } from "../helper/utils";
import { header } from "./header";
import { model } from "./model";
import { footer } from "./footer";

document.getElementById("root").innerHTML = render(header(), model(), footer());
