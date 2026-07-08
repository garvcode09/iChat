import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import PushUpMuscleVisualizer from "./Pushup-muscle-visualizer.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton/>
        </Show>
      </header>
      <PushUpMuscleVisualizer/>
    </>
  );
}

export default App;
