import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import boardService from "../services/board.service";
import ViewBoard from '../component/ViewBoard';
import authsevice from '../services/auth.service';

const ListBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const user = authsevice.getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);

  const init = () => {
    boardService
      .getAllBoard()
      .then((res) => {
        const sortedList = res.data.sort((a, b) => {
          const dateA = new Date(a.regdate).getTime();
          const dateB = new Date(b.regdate).getTime();
          return dateB - dateA;
        });
        setBoardList(sortedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBoard = (id) => {
    boardService
      .deleteBoard(id)
      .then((res) => {
        setMsg("성공적으로 제거되었습니다");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const filteredBoardList = boardList.filter((board) => {
    const searchTermLower = searchTerm.toLowerCase();
    const selectedCriteria = searchCriteria.toLowerCase();

    if (selectedCriteria === "title") {
      return board.title.toLowerCase().includes(searchTermLower);
    } else if (selectedCriteria === "content") {
      return board.content.toLowerCase().includes(searchTermLower);
    } else if (selectedCriteria === "writer") {
      return board.writer.toLowerCase().includes(searchTermLower);
    }

    return false;
  });

  const ITEMS_PER_PAGE = 10;

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const reversedList = filteredBoardList.slice().reverse();
    return reversedList.slice(startIndex, endIndex);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredBoardList.length / ITEMS_PER_PAGE);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
  `;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                자유 게시판
                {msg && (
                  <p className="fs-4 text-center text-success">{msg}</p>
                )}
              </div>

              <div className="card-body">
                <div className="row-vh d-flex flex-row align-items-start">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="mb-3">
                    <select
                      className="form-select me-2"
                      value={searchCriteria}
                      onChange={handleSearchCriteriaChange}
                    >
                      <option value="title">제목</option>
                      <option value="content">내용</option>
                      <option value="writer">작성자</option>
                    </select>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">제목</th>
                      <th scope="col">내용</th>
                      <th scope="col">글쓴이</th>
                      <th scope="col">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentItems().map((b, index) => (
                      <tr key={b.id}>
                        <td>{filteredBoardList.length - (currentPage - 1) * itemsPerPage - index}</td>
                        <td>
                          <StyledLink to={"/viewBoard/" + b.id}>
                            {b.title}
                          </StyledLink>
                        </td>
                        <td>{b.content}</td>
                        <td>{b.writer}</td>
                        <td>{b.regdate} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {isLoggedIn && (
                  <Link to="/AddBoard" className="btn btn-info">
                    게시판 등록
                  </Link>
                )}

                <div className="d-flex justify-content-center">
                  <button onClick={handlePrevPage}>이전</button>
                  <nav>
                    <ul className="pagination">
                      {Array.from(
                        {
                          length: Math.ceil(
                            filteredBoardList.length / itemsPerPage
                          ),
                        },
                        (_, i) => (
                          <li className="page-item" key={i}>
                            <button
                              className={`page-link ${i + 1 === currentPage ? 'active' : ''}`}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                  <button onClick={handleNextPage}>다음</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/viewBoard/:id" element={<ViewBoard />} />
      </Routes>
    </>
  );
};

export default ListBoard;
