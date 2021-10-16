import Spinner from "react-bootstrap/Spinner";

function Loading() {
  const style = {
    loadingDiv: {
      display: "flex",
      justifyContent: "center",
      margin: "100px auto",
    },
    spinnerSpacing: {
      margin: "0 20px",
    },
  };

  return (
    <div style={style.loadingDiv}>
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="secondary" style={style.spinnerSpacing} />
      <Spinner animation="grow" variant="secondary" />
    </div>
  );
}

export default Loading;
