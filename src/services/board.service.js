import axios from "axios";


const API_URL="http://localhost:8080/api/auth";



class BoardService{

saveBoard(board){
    console.log(board);
    return axios.post(API_URL + "/saveBoard",board);
}

getAllBoard()
{
    return axios.get(API_URL + "/listBoard")
}

getBoardById(id)
{
    return axios.get(API_URL + "/" +id);
}

deleteBoard(id) {
    return axios.get(API_URL + "/deleteBoard/" + id);

}

editBoard(board)
{
    return axios.post(API_URL + "/editBoard/" +board.id,board);
}





}


export default new BoardService;