import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import boardService from "../services/board.service";

const EditBoard = () => {
  const [board, setBoard] = useState({
    id: "",
    title: "",
    content: "",
    writer: "",
    regdate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    boardService
      .getBoardById(id)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setBoard({ ...board, [e.target.name]: value });
  };

  const BoardUpdate = (e) => {
    e.preventDefault();
    boardService
      .editBoard(board)
      .then((res) => {
        navigate("/ListBoard");
        setMsg("게시판 수정이 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Edit Product</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}

              <div className="card-body">
                <form onSubmit={(e) => BoardUpdate(e)}>
                  <div className="mb-3">
                    <label>게시판</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={board.title}
                    />
                  </div>

                  <div className="mb-3">
                    <label>제목</label>
                    <input
                      type="text"
                      name="content"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={board.content}
                    />
                  </div>
                  <div className="mb-3">
                    <label>작성자</label>
                    <input
                      type="text"
                      name="writer"
                      className="form-control"
                      readOnly // 읽기 전용으로 설정하여 수정 불가능하게 만듦
                      value={board.writer}
                    />
                  </div>
                  <button className="btn btn-primary col-md-12">수정</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBoard;
