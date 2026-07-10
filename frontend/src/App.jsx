import "./App.css";
import {
  ClerkLoading,
  ClerkLoaded,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import Loading from "./components/Loading";

function App() {
  return (
    <>
      <ClerkLoading>
        <Loading message="Connecting" />
      </ClerkLoading>

      <ClerkLoaded>
        <header>
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
      </ClerkLoaded>
    </>
  );
}

export default App;
