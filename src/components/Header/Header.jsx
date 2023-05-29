import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const currentUser = AuthService.getCurrentUser();
  const showModeratorBoard = currentUser && currentUser.roles.includes("ROLE_MODERATOR");
  const showAdminBoard = currentUser && currentUser.roles.includes("ROLE_ADMIN");

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <a href="/" onClick={() => handleLinkClick("/")} className="logo-link">
          <img src="./logo.png" alt="logo" width={100} />
        </a>

        <div className="flexCenter h-menu">
          <a
            href="/listboard"
            onClick={() => handleLinkClick("/listboard")}
            className="menu-link"
          >
            게시판
          </a>
          <a
            href="/listboard"
            onClick={() => handleLinkClick("/listboard")}
            className="menu-link"
          >
            고객후기
          </a>
          {currentUser ? (
            <>
              <a
                href="/profile"
                onClick={() => handleLinkClick("/profile")}
                className="menu-link bold"
              >
                {currentUser.username}
              </a>
              <button className="button" onClick={handleLogout}>
                LogOut
              </button>
              {showModeratorBoard && (
                <a
                  href="/mod"
                  onClick={() => handleLinkClick("/mod")}
                  className="menu-link"
                >
                  Moderator Board
                </a>
              )}
              {showAdminBoard && (
                <a
                  href="/admin"
                  onClick={() => handleLinkClick("/admin")}
                  className="menu-link"
                >
                  Admin Board
                </a>
              )}
              <a
                href="/user"
                onClick={() => handleLinkClick("/user")}
                className="menu-link"
              >
                User
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                onClick={() => handleLinkClick("/login")}
                className="menu-link"
              >
                Login
              </a>
              <a
                href="/register"
                className="button"
                onClick={() => handleLinkClick("/register")}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
