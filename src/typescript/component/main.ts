import { header } from "./header";
import { model } from "./model";

document.getElementById("root").innerHTML = [header(), model()].join("");
