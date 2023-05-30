import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactModal from "react-modal";
import boardService from "../services/board.service";
import authService from "../services/auth.service";
import CommentService from "../services/CommentService";
import "./ViewBoard.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

const ViewBoard = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    fetchBoard();
    fetchComments();
  }, []);

  const fetchBoard = () => {
    boardService
      .getBoardById(id)
      .then((res) => {
        setBoard(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchComments = () => {
    CommentService.getCommentsByBoardId(id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBoard = () => {
    boardService
      .deleteBoard(id)
      .then((res) => {
        navigate("/listBoard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const createComment = () => {
    const comment = {
      boardId: board.id,
      username: currentUser.username,
      content: commentContent,
      createdAt: new Date().toISOString(),
    };
    CommentService.createComment(comment.boardId, comment.content)
      .then((res) => {
        fetchComments();
        setCommentContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateComment = (commentId, updatedContent) => {
    const updatedComment = {
      content: updatedContent,
    };
    CommentService.updateComment(commentId, updatedComment)
      .then((res) => {
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (commentId) => {
    CommentService.deleteComment(commentId)
      .then((res) => {
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = (commentId, commentContent) => {
    setModalIsOpen(true);
    setEditedCommentId(commentId);
    setEditedCommentContent(commentContent);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditedCommentId(null);
    setEditedCommentContent("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ViewBoard-wrapper">
        <div className="ViewBoard-box">
          <div className="card">
            <div className="card-header fs-3 text-center">{board.title}</div>
            <div className="card-body">
              <p>{board.content}</p>
              <p>작성자: {board.writer}</p>
              <p>작성일: {new Date(board.regdate).toLocaleDateString()}</p>
              {currentUser && currentUser.username === board.writer && (
                <div className="d-flex justify-content-start">
                  <Link
                    to={`/editBoard/${board.id}`}
                    className="btn btn-primary me-2"
                  >
                    수정
                  </Link>
                  <button onClick={deleteBoard} className="btn btn-danger">
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ViewComment-box">
          <div className="ViewComment-container">
            <h4>댓글</h4>
            {currentUser ? (
  <div className="comment-input-container">
    <div className="comment-input-wrapper">
      <TextField
        id="standard-multiline-flexible"
        placeholder="댓글 추가..."
        multiline
        variant="standard"
        rows={1}
        value={commentContent}
        onChange={handleCommentChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <div className="comment-buttons">
        <button
          className="btn btn-secondary mt-2"
          onClick={() => setCommentContent("")}
        >
          취소
        </button>
        <button className="btn btn-primary mt-2" onClick={createComment}>
          댓글
        </button>
      </div>
    </div>
  </div>
) : (
  <p>댓글을 작성하려면 로그인이 필요합니다.</p>
)}
          </div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Comment Modal"
          >
            <h2>댓글 수정</h2>
            <textarea
              rows="3"
              className="form-control"
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                updateComment(editedCommentId, editedCommentContent);
                closeModal();
              }}
            >
              저장
            </button>
            <button className="btn btn-secondary mt-2" onClick={closeModal}>
              취소
            </button>
          </ReactModal>

          <div className="ViewCommentList-container">
            <h4>댓글 목록</h4>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>작성자: {comment.username}</p>
                <p>작성일: {comment.createdAt}</p>
                {currentUser && currentUser.username === comment.username && (
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => openModal(comment.id, comment.content)}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteComment(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewBoard;
