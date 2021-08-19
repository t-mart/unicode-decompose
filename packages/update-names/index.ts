#!/usr/bin/env ts-node

import fs from "fs";
import process from "process";

import got from "got";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

class Character {
  readonly codepoint: number;
  readonly name: string;
  readonly isCombiner: boolean;

  // When new DBs are available, will need to update this URL
  static readonly DATABASE_URL =
    "https://www.unicode.org/Public/13.0.0/ucd/UnicodeData.txt";

  constructor(
    codepoint: number,
    name: string,
    isCombiner: boolean
  ) {
    this.codepoint = codepoint;
    this.name = name;
    this.isCombiner = isCombiner;
  }

  static getFromLine(line: string) {
    const fields = line.trim().split(";");
    const codepoint = parseInt(fields[0], 16);
    const name = fields[1];
    const isCombiner = fields[2].startsWith("M");
    return new Character(codepoint, name, isCombiner);
  }

  static async getAllFromDatabase() {
    return await got(this.DATABASE_URL).then((response) => {
      return response.body.split("\n").filter((line) => line).map((line) => this.getFromLine(line));
    });
  }
}

async function main(outputPath?: string) {
  const nameMap: Record<string, { name: string; isCombiner: boolean }> = {};

  await Character.getAllFromDatabase().then((characters) => {
    characters.forEach((character) => {
      if (character.codepoint.toString() === "NaN") process.stderr.write(JSON.stringify(character));
      nameMap[character.codepoint.toString()] = {
        name: character.name,
        isCombiner: character.isCombiner,
      };
    });
  });

  const jsonString = JSON.stringify(nameMap, undefined, 2);

  if (outputPath === undefined) {
    process.stdout.write(jsonString + "\n");
  } else {
    fs.createWriteStream(outputPath).write(jsonString);
  }
}

yargs(hideBin(process.argv))
  .positional("outputPath", {
    type: "string",
    describe: "Write contents to this path. If omitted, write to stdout.",
  })
  .command(
    "$0 [outputPath]",
    "Path at which to write the JSON-encoded names file",
    () => {},
    (argv) => {
      main(argv.outputPath);
    }
  ).argv;
