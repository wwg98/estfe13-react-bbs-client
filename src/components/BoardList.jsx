import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router";
import { useEffect, useState, useCallback } from "react";

function Board({ data, onCheckBoxChange }) {
  return (
    <tr>
      <td>
        <Form.Check
          onChange={e => {
            onCheckBoxChange(e.target.checked, data.id);
          }}
        />
      </td>
      <td>{data.id}</td>
      <td>
        <Link to={`/view/${data.id}`}>{data.title}</Link>
      </td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
    </tr>
  );
}

export default function BoardList() {
  console.log("BoardList");
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const getList = useCallback(() => {
    axios
      .get("http://localhost:3000/list", {})
      .then(response => {
        setList(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const onCheckBoxChange = (checked, id) => {
    setCheckList(Prev => {
      if (checked) {
        return [...Prev, id];
      } else {
        return Prev.filter(item => item !== id);
      }
    });
  };

  const handleDelete = () => {
    if (checkList.length === 0) {
      alert("삭제할 글을 선택해주세요.");
      return;
    }
    const boardIdList = checkList.join();
    axios
      .post("http://localhost:3000/deleteselect", { boardIdList })
      .then(() => {
        getList();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={5}>글이 없습니다.</td>
            </tr>
          ) : (
            list.map((item, idx) => (
              <Board key={idx} data={item} onCheckBoxChange={onCheckBoxChange} />
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/write" className="btn btn-primary">
          입력
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}
