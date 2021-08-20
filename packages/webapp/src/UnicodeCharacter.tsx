import { codepointNames } from "./CodepointNames";

export class UnicodeCharacter {
  readonly codepoint: number;
  readonly isCombiner: boolean;
  readonly name: string;

  static DOTTED_CIRCLE = "◌"

  constructor(codepoint: number, isCombiner: boolean, name: string) {
    this.codepoint = codepoint;
    this.name = name;
    this.isCombiner = isCombiner;
  }

  static lookupByString(str: string) {
    if (str.length > 1) {
      throw new Error(`UnicodeCharacter object requires 1-character-length string`);
    }
    return this.lookupByCodepoint(str.codePointAt(0)!);
  }

  static lookupByCodepoint(codepoint: number) {
    const { name, isCombiner } = codepointNames[codepoint]
    return new UnicodeCharacter(codepoint, isCombiner, name);
  }

  get codepointString() {
    return `U+${this.codepoint.toString(16).toUpperCase().padStart(4, "0")}`;
  }

  toString() {
    return String.fromCodePoint(this.codepoint);
  }

  toStringCombinedIfNecessary() {
    const str = this.toString();
    if (this.isCombiner) {
      return UnicodeCharacter.DOTTED_CIRCLE + str
    }
    return str
  }
}
