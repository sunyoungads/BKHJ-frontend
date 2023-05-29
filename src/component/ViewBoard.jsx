import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import boardService from "../services/board.service";
import authService from "../services/auth.service";
import CommentService from "../services/CommentService";

const ViewBoard = () => {
  const { id } = useParams(); // URL 매개변수에서 게시물 ID를 추출합니다.
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
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

  const updateComment = (commentId, updatedContent, updatedCreatedAt) => {
    const updatedComment = {
      content: updatedContent,
      createdAt: updatedCreatedAt,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-3">
        <div className="card">
          <div className="card-header fs-3 text-center">{board.title}</div>
          <div className="card-body">
            <p>{board.content}</p>
            <p>작성자: {board.writer}</p>
            <p>작성일: {board.regdate}</p>
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

        <div className="mt-3">
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
                    onClick={() => {
                      const updatedContent = prompt(
                        "댓글 내용을 입력하세요.",
                        comment.content
                      );
                      if (updatedContent) {
                        updateComment(comment.id, updatedContent);
                      }
                    }}
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
              <hr />
            </div>
          ))}
        </div>

        <div className="mt-3">
          <h4>댓글 작성</h4>
          {currentUser ? (
            <div>
              <textarea
                rows="3"
                className="form-control"
                value={commentContent}
                onChange={handleCommentChange}
              ></textarea>
              <button
                className="btn btn-primary mt-2"
                onClick={createComment}
              >
                댓글 등록
              </button>
            </div>
          ) : (
            <p>댓글을 작성하려면 로그인이 필요합니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewBoard;
