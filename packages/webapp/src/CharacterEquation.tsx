import { Character } from "./Character";
import { EquationOperator } from "./EquationOperator";
import { EquationTerm } from "./EquationTerm";

interface CharacterComponentsProps {
  characters: Character[];
}

export function CharacterEquation(props: CharacterComponentsProps) {
  const { characters } = props;

  let combinedArray: string[];

  if (characters[0].isCombiner) {
    // U+25CC is the dotted circle ◌
    combinedArray = ["◌", ...characters.map((c) => c.s)];
  } else {
    combinedArray = characters.map((c) => c.s);
  }

  const combined = combinedArray.join("");

  const terms = characters
    .map((character) => (
      <EquationTerm >
        <div class="font-mono">U+{character.s.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}</div>
        <div class="text-5xl">{(character.isCombiner ? "◌" : "") + character.s}</div>
        <div class="capitalize">{character.name.toLowerCase()}</div>
      </EquationTerm>
    ))
    .reduce((previous, current) => (
      <>
        {previous}
        <EquationOperator character="+" />
        {current}
      </>
    ));

  return (
    <div class="flex overflow-auto gap-2 items-stretch">
      <EquationTerm>
        <div class="text-5xl">{combined}</div>
      </EquationTerm>
      <EquationOperator character="=" />
      {terms}
    </div>
  );
}
