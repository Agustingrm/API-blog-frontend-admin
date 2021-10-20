import { useHistory } from "react-router-dom";

function Comments(props) {
  const { _id, post ,username, content } = props.comment;
  const history = useHistory();

  const handleClickDelete = (e) => {
    console.log("https://agustingrm-blog-api.herokuapp.com/comments/" + _id + "/");
    fetch("https://agustingrm-blog-api.herokuapp.com/comments/" + _id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          history.push("/home/"+post);
        },
        (error) => {
          console.log(error);
        }
      );
    e.preventDefault();
  };

  return (
    <div>
      <p>Username: {username} </p>
      <p>Comment: {content} </p>
      <button onClick={handleClickDelete}>Delete</button>
    </div>
  );
}

export default Comments;
