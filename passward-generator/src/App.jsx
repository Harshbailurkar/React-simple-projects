import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numstate, setNumstate] = useState(false);
  const [charstate, setCharstate] = useState(false);
  const [Passward, setPassward] = useState("");
  let [copiedTextPost, setCopiedTextPost] = useState("");
  const passwardRef = useRef(null);

  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numstate) str += "0123456789";
    if (charstate) str += "!@#$%^&*()_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let charNo = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charNo);
    }

    setPassward(pass);
  }, [length, numstate, charstate, setPassward]);

  useEffect(() => {
    passwardGenerator();
  }, [length, numstate, charstate, passwardGenerator]);

  useEffect(() => {
    setTimeout(() => {
      setCopiedTextPost("");
    }, 2000);
  }, [copiedTextPost]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-2xl my-3 text-center text-white">
          Passward Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Passward}
            className="outline-none w-full py-1 px-3 "
            placeholder="passward"
            readOnly
            ref={passwardRef}
          />
          <button
            className="outline-none bg-blue-700 text-ehitr px-3 py=0.5 shrink=0"
            onClick={useCallback(() => {
              passwardRef.current?.select();
              // passwardRef.current?.setSelectionRange(0, 9);
              console.log(Passward);
              window.navigator.clipboard.writeText(Passward);
              setCopiedTextPost(`passward copied`);
            }, [Passward])}
          >
            COPY
          </button>
        </div>
        <div className="flex item-center gap-x-1 ">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="flex item-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numstate}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumstate((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex item-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charstate}
              id="CharacterInput"
              className="cursor-pointer"
              onChange={() => {
                setCharstate((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
        <div className="flex item-center gap-x-1 ">
          <button
            className=" bg-red-200 p-1 rounded-lg text-black outline-none text-ehitr shrink-0 my-1 px-4"
            onClick={passwardGenerator}
          >
            Try another
          </button>
        </div>
      </div>
      <div className="text-white text-center text-2xl">{copiedTextPost}</div>
    </>
  );
}

export default App;
