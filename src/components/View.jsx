import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function View({ handleModify }) {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    date: "",
    image: null,
  });

  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/view?id=${id}`, {})
      .then(response => {
        if (!response.data || response.data.length === 0) {
          setIsError(true);
          return;
        }

        const data = response.data[0];

        setContent({
          writer: data.writer,
          title: data.title,
          content: data.content,
          date: data.date,
          image: data.image_path,
        });
      })

      .catch(error => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {});
  }, []);

  if (isError) {
    return (
      <div>
        <p>잘못된 접근 입니다.</p>
        <p>다시 확인해 주세요.</p>
        <Link to="/" className="btn btn-primary">
          홈으로
        </Link>
      </div>
    );
  }

  const handleClick = () => {
    handleModify(id);
  };

  const handleDelet = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios
      .post(`${API_URL}/delete`, { id: id })
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <>
      <h2>{content.title}</h2>
      <div className="d-flex justify-content-between">
        <p>글 쓴이 : {content.writer}</p>
        <p>{content.date}</p>
      </div>
      <hr />
      {content.content}
      {content.image && (
        <div>
          <img src={`/${content.image}`} alt={content.title} style={{ maxWidth: "80%" }} />
        </div>
      )}
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/" className="btn btn-primary">
          홈
        </Link>
        <Button variant="secondary" onClick={handleClick}>
          수정
        </Button>
        <Button variant="danger" onClick={handleDelet}>
          삭제
        </Button>
      </div>
    </>
  );
}
