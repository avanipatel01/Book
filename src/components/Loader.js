import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <ClipLoader color="#36d7b7" />
      </div>
    </>
  );
};

export default Loader;
