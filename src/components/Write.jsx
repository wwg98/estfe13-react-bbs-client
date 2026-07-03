import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function Write({ isModifyMode, boardId, handleCancel }) {
  let navigate = useNavigate();

  const [content, setContent] = useState({
    name: "",
    title: "",
    content: "",
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isModifyMode && boardId) {
      axios
        .get(`http://localhost:3000/view?id=${boardId}`, {})
        .then(response => {
          if (!response.data || response.data.length === 0) {
            setIsError(true);
            return;
          }

          const data = response.data[0];

          setContent({
            name: data.writer,
            title: data.title,
            content: data.content,
          });
        })

        .catch(error => {
          console.error(error);
          setIsError(true);
        })
        .finally(() => {});
    }
  }, []);

  const validate = e => {
    const name = e.target.name.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!name || !title || !content) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    return {
      name,
      title,
      content,
    };
  };

  const write = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;
    axios
      .post("http://localhost:3000/write", formData)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  };

  const update = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;
    axios
      .post("http://localhost:3000/update", {
        ...formData,
        id: boardId,
      })
      .then(() => {
        handleCancel();
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  };

  const handleClick = () => {
    handleCancel();
    navigate("/");
  };

  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "글수정" : "글쓰기"}</h2>
      <Form onSubmit={isModifyMode ? update : write}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={content.name}
            placeholder="이름을 입력해주세요."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue={content.title}
            placeholder="제목을 입력해주세요."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            defaultValue={content.content}
            name="content"
            rows={3}
            required
          />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button type="submit" variant="primary">
            입력
          </Button>
          <Button variant="secondary" onClick={handleClick}>
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}
