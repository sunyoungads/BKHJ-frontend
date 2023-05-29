import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:8080/api/comments";

class CommentService {
  static getComments() {
    const url = `${API_URL}`;
    const headers = authHeader();
    return axios.get(url, { headers });
  }

  static getCommentsByBoardId(boardId) {
    const url = `${API_URL}/board/${boardId}`;
    const headers = authHeader();
    return axios.get(url, { headers });
  }

  static createComment(boardId, commentContent) {
    const url = `${API_URL}`;
    const headers = authHeader();
    const user = authService.getCurrentUser();
    if (user) {
      const comment = {
        board: { id: boardId }, // board_id 값을 설정
        username: user.username,
        content: commentContent,
        createdAt: new Date().toISOString(),
      };
      return axios.post(url, comment, { headers });
    }
    return Promise.reject("User not found.");
  }

  static updateComment(commentId, updatedComment) {
    const url = `${API_URL}/${commentId}`;
    const headers = authHeader();
    updatedComment.updatedAt = new Date().toISOString(); // updated_at 필드 추가
    return axios.put(url, updatedComment, { headers });
  }
  

  static deleteComment(commentId) {
    const url = `${API_URL}/${commentId}`;
    const headers = authHeader();
    return axios.delete(url, { headers });
  }
}

export default CommentService;
