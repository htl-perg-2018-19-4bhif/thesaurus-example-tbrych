import { cursorTo } from "readline";

let readAr: string[] = new Array();
const args = process.argv;
const words: string[] = new Array();
const wordsB: boolean[] = new Array();

if (args.length <= 2) {
    console.log("Please specify word(s)!");
    process.exit(0);
}
for (let i = 2; i < args.length; i++) {
    words.push(args[i]);
    wordsB.push(false);
}

let lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("openthesaurus.txt")
});
lineReader.on("line", function (line) {
    readAr.push(line);
});
lineReader.on("close", function (line) {
    let ar = new Array();
    for (let i = 0; i < readAr.length; i++) {
        let curAr: string[] = readAr[i].split(";");
        ar.push(curAr);
    }

    for (let w = 0; w < words.length; w++) {
        for (let i = 0; i < ar.length; i++) {
            for (let j = 0; j < ar[i].length; j++) {
                let curString: string = ar[i][j];
                if (words[w] === curString || curString.indexOf(words[w]) != -1) {
                    wordsB[w] = true;
                    console.log(curString + ":");
                    for (let k = 0; k < ar[i].length; k++) {
                        if (k != j) {
                            console.log("\t" + ar[i][k]);
                        }
                    }
                    break;
                }
            }
        }
        if (wordsB[w] === false) {
            console.log(words[w] + ":");
            console.log("\tNo matches found!");
        }
    }
});