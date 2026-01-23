import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: "40px 0",
        textAlign: "center",
        fontSize: "14px",
        opacity: 0.7,
      }}
    >
      <a href="/company.html">会社情報</a>
      {" | "}
      <a href="/privacy-policy.html">プライバシーポリシー</a>
      {" | "}
      <a href="/tokushoho.html">特商法に基づく表記</a>
    </footer>
  );
};

export default Footer;
