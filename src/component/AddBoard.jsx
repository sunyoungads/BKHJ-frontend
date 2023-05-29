import React, { useState, useEffect, useRef } from "react";
import BoardService from "../services/board.service";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import UploadService from "../services/FileUploadService";

const AddBoard = () => {
  const navigate = useNavigate();
  let today = new Date();
  today = today.toISOString().split("T")[0];
  const currentUser = authService.getCurrentUser();
  //UploadImages
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [,setMessage] = useState([]);
  const [,setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);

  const [board, setBoard] = useState({
    title: "",
    content: "",
    writer: currentUser.username,
    regdate: today,
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setBoard({ ...board, [e.target.name]: value });
  };

  const BoardRegsiter = (e) => {
    e.preventDefault();
  
    const files = Array.from(selectedFiles);
  
    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));
  
    progressInfosRef.current = {
      val: _progressInfos,
    };
  
    const uploadPromises = files.map((file, i) => upload(i, file));
  
    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setImageInfos(files.data);
  
        // Continue with saving the board after uploading images
        return BoardService.saveBoard(board);
      })
      .then((res) => {
        console.log("Board Added Successfully");
        setMsg("게시판 생성완료");
        setBoard({
          title: "",
          content: "",
          writer: currentUser.username,
          regdate: "",
        });
        navigate("/listBoard");
      })
      .catch((error) => {
        console.log(error);
      });
  
    setMessage([]);
  };
  

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the image successfully: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the image: " + file.name,
        ]);
      });
  };


  return (
    <>
      <div className="container mt3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">게시판 추가</div>
              {msg && <p className="fs-4-text-center text-success">{msg}</p>}
              <div className="card-body"></div>
              {/* 파일업로드 start */}
             
              {/* 파일업로드 end */}
              {/* 파일업로드 렌더링 start*/}
              {progressInfos &&
                progressInfos.val.length > 0 &&
                progressInfos.val.map((progressInfo, index) => (
                  <div className="mb-2" key={index}>
                    <span>{progressInfo.fileName}</span>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progressInfo.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progressInfo.percentage + "%" }}
                      >
                        {progressInfo.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
             
              <form onSubmit={(e) => BoardRegsiter(e)}>
                <div className="mb-3">
                  <label>제목</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    value={board.title}
                  />
                </div>
                <div className="mb-3">
                  <label>내용</label>
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
                <div className="row">
                <div className="col-8">
                  <label className="btn btn-default p-0">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={selectFiles}
                    />
                  </label>
                </div>
              </div>
                 {/* 파일업로드 렌더링 end */}
              {/* 이미지 미리보기 start */}
              {imagePreviews && (
                <div>
                  {imagePreviews.map((img, i) => {
                    return (
                      <img className="preview" src={img} alt={"image-" + i} key={i} />
                    );
                  })}
                </div>
              )}
              {/* 이미지 미리보기 end */}
                <button className="btn btn-primary col-md-12">제출</button>
              </form>
              <div className="card-footer mt-3">
                <Link to="/listBoard" className="btn btn-secondary">
                  취소
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBoard;
