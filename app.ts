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
    let curLine: string[] = line.split(";")

    for (let w = 0; w < words.length; w++) {
        for (let i = 0; i < curLine.length; i++) {
            let curString: string = curLine[i];
            if (words[w] === curString || curString.indexOf(words[w]) != -1) {
                wordsB[w] = true;
                console.log(curString + ":");
                for (let j = 0; j < curLine.length; j++) {
                    if (j != i) {
                        console.log("\t" + curLine[j]);
                    }
                }
                break;
            }
        }
    }
});
lineReader.on("close", function (line) {
    for (let i = 0; i < words.length; i++) {
        if (wordsB[i] === false) {
            console.log(words[i] + ":");
            console.log("\tNo matches found!");
        }
    }
});