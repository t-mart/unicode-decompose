import { useState } from "preact/hooks";

import { Decomposition } from "./Decomposition";

export function App() {
  const [inputText, setInputText] = useState(
    new URL(window.location.href).searchParams.get("text") || ""
  );

  const onInput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setInputText(e.target.value);
    }
  };

  return (
    <div class="container max-w-screen-lg mx-auto px-4 space-y-8 my-8">
      <h1 class="text-2xl">Unicode Decompose Tool</h1>
      <input
        type="text"
        value={inputText}
        onInput={onInput}
        class="rounded focus:ring-2 focus:ring-pink-500 focus:outline-none ring-1 ring-gray-700 p-2 w-full"
        placeholder="Enter some text"
      />
      <Decomposition text={inputText}/>
    </div>
  )
}
