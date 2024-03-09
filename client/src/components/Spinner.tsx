import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Oval type="TailSpin" color="blue" height={100} width={100} />
    </div>
  );
};

export default Spinner;
