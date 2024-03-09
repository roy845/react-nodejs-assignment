type ErrorProps = {
  error: string;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div
      style={{
        color: "red",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {error}
    </div>
  );
};

export default Error;
