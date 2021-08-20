import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export function EquationTerm(props: Props) {
  const { children } = props
  return (
    <div class="flex flex-col justify-center border-2 rounded items-center text-center w-1/6 flex-none p-4">
      {children}
    </div>
  );
}
