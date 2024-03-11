import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(7);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUXWXYZabcdefghijklmnopqrstuvwxyz";
    numbersAllowed ? (str += "1234567890") : "";
    charactersAllowed ? (str += `!@#$%^&*()`) : "";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charactersAllowed]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <>
      <div className="bg-blue-950 rounded-md p-3 shadow-md text-white m-auto w-3/4">
        <h1 className="text-center text-white text-lg">Password Generator</h1>
        <div className="flex p-2 items-center gap-x-1 ">
          <input
            type="text"
            value={password}
            className=" flex shadow w-3/4 h-10 rounded-lg p-2 text-black"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          ></input>
          <button
            className="flex flex-col justify-center rounded-lg text-white items-center h-10 w-1/4 mx-2  bg-blue-500"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div className="flex flex-row mt-6">
          <input
            type="range"
            min={7}
            max={20}
            id="length"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length" className="mx-4 cursor-pointer">
            Length: {length}
          </label>
          <input
            type="checkbox"
            id="Numbers"
            defaultChecked={numbersAllowed}
            className="ml-4"
            onChange={() => setNumbersAllowed((prev) => !prev)}
          />
          <label htmlFor="Numbers" className="mx-2">
            Numbers
          </label>
          <input
            type="checkbox"
            id="Characters"
            defaultChecked={charactersAllowed}
            className="ml-4"
            onChange={() => setCharactersAllowed((prev) => !prev)}
          />
          <label htmlFor="Characters" className="mx-2">
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
