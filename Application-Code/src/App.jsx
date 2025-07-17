import "./App.css";
import Heading from "./components/Heading";
import ClimateBody from "./components/ClimateBody";

function App() {
  return (
    <>
      <div className="w-[100%] flex justify-center items-center flex-col">
        <Heading />
        <ClimateBody />
      </div>
    </>
  );
}

export default App;
