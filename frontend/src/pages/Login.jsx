import { useState, useEffect } from "react";
import "../styles/login.css";

function Login() {
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [translations, setTranslations] = useState({});

  const languageLabel = language === "sv" ? "Svenska" : "English";
  const languageFlag =
    language === "sv"
      ? "https://storage.123fakturere.no/public/flags/SE.png"
      : "https://storage.123fakturere.no/public/flags/GB.png";

  
  useEffect(() => {
    fetch(`http://localhost:3001/translations?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
      })
      .catch((err) => {
        console.error("Failed to load translations", err);
      });
  }, [language]);

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

     
      <header className="login-header">
        <nav className="header-nav">
          <div className="nav-logo-wrapper">
            <img
              className="header-logo"
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="Logo"
            />
          </div>

          <a href="#">Home</a>
          <a href="#">Order</a>
          <a href="#">Our customers</a>
          <a href="#">About us</a>
          <a href="#">Contact us</a>

         
          <div className="language-selector">
            <div
              className="language-current"
              onClick={() => setLangOpen(!langOpen)}
            >
              <span className="language-text">{languageLabel}</span>
              <img src={languageFlag} alt="Language flag" />
            </div>

            {langOpen && (
              <div className="language-dropdown">
                <div
                  className="language-option"
                  onClick={() => {
                    setLanguage("en");
                    setLangOpen(false);
                  }}
                >
                  <span>English</span>
                  <img
                    src="https://storage.123fakturere.no/public/flags/GB.png"
                    alt="English"
                  />
                </div>

                <div
                  className="language-option"
                  onClick={() => {
                    setLanguage("sv");
                    setLangOpen(false);
                  }}
                >
                  <span>Svenska</span>
                  <img
                    src="https://storage.123fakturere.no/public/flags/SE.png"
                    alt="Swedish"
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

     
      <div className="login-content">
        <div className="login-box">
          <h2>{translations.login_title ?? ""}</h2>

          <form>
            <div className="form-group">
              <label>{translations.email_label ?? ""}</label>
              <input
                type="email"
                placeholder={translations.email_placeholder ?? ""}
              />
            </div>

            <div className="form-group">
              <label>{translations.password_label ?? ""}</label>
              <input
                type="password"
                placeholder={translations.password_placeholder ?? ""}
              />
            </div>

            <button type="submit" className="login-btn">
              {translations.login_button ?? ""}
            </button>
          </form>

          <div className="forgot-password">
            <a href="#">
              {translations.forgot_password ?? ""}
            </a>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <div className="footer-top">
          <div className="footer-left">123 Fakturera</div>
          <div className="footer-right">
            <a href="#">Home</a>
            <a href="#">Order</a>
            <a href="#">Contact us</a>
          </div>
        </div>

        <div className="footer-bottom">
          © Lättfaktura, CRO no. 638537, 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Login;
