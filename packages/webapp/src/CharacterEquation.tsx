import { UnicodeCharacter } from "./UnicodeCharacter";
import { EquationOperator } from "./EquationOperator";
import { EquationTerm } from "./EquationTerm";
import { EquationTermRHS } from "./EquationTermRHS";
import { EquationTermLHS } from "./EquationTermLHS";

interface CharacterComponentsProps {
  characters: UnicodeCharacter[];
}

export function CharacterEquation(props: CharacterComponentsProps) {
  const { characters } = props;

  const lhs = <EquationTermLHS group={characters}/>;

  const rhs = characters
    .map((character) => {

      return (
        <EquationTermRHS character={character} />
      );
    })
    .reduce((previous, current) => (
      <>
        {previous}
        <EquationOperator character="+" />
        {current}
      </>
    ));

  return (
    <div class="flex overflow-auto gap-2 items-stretch">
      {lhs}
      <EquationOperator character="=" />
      {rhs}
    </div>
  );
}
