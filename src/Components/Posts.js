import { useHistory } from "react-router-dom";

function Posts(props) {
  const { _id, author, title, content, time } = props.post;
  const history = useHistory();

  const handleClickDelete = (e) => {
    console.log("https://agustingrm-blog-api.herokuapp.com/posts/delete/" + _id + "/");
    fetch("https://agustingrm-blog-api.herokuapp.com/posts/" + _id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'x-access-token':localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          history.push("/home");
        },
        (error) => {
          console.log(error);
        }
      );
    e.preventDefault();
  };

  const handleClickUpdate = (e) => {
    history.push("/home/"+_id);
  };

  return (
    <div>
      <p>Author: {author} </p>
      <p>formatedDate: {time} </p>
      <p>Title: {title} </p>
      <p>Content: {content} </p>
      <button onClick={handleClickDelete}>Delete</button>
      <button onClick={handleClickUpdate}>Update</button>
    </div>
  );
}

export default Posts;
