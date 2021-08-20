import { UnicodeCharacter } from "./UnicodeCharacter";
import { CharacterEquation } from "./CharacterEquation";

/**
 * Break up a string into groups that consist of a codepoint and any trailing "combiner" codepoints.
 * A combiner codepoint is one that is rendered in the same space as the character it's attached to,
 * such as the tilde in ñ.
 * @param text Input string to break up into groups
 * @returns CharacterEquation components for each of the groups found.
 */
function groupFromText(text: string) {
  const groups: UnicodeCharacter[][] = [];
  let thisGroup: UnicodeCharacter[] = [];

  for (const character of Array.from(text.normalize("NFD"))) {
    const unicodeChar = UnicodeCharacter.lookupByString(character);
    if (!unicodeChar.isCombiner) {
      groups.push(thisGroup);
      thisGroup = [unicodeChar];
    } else {
      thisGroup.push(unicodeChar);
    }
  }
  groups.push(thisGroup);
  return groups
    .filter((group) => group.length > 0)
    .map((group) => <CharacterEquation characters={group} />);
}

interface Props {
  text: string;
}

export function Decomposition(props: Props) {
  const { text } = props;
  const groupTiles = groupFromText(text);
  return <div class="flex flex-col space-y-8">{groupTiles}</div>;
}
