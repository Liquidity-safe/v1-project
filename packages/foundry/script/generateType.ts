import { glob } from "glob";
import { basename, normalize } from "node:path";

const files = (await glob("./src/**/*.sol")).map((str) => basename(str));


function start(){
   let cmd = normalize(`./out/{${files.join(",")}}/*.json`);
   eval ('typechain --target=ethers-v6 '+cmd);
}

start();