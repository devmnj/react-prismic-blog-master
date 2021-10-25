import React, { useEffect } from "react";
import Prism from "prismjs";
import "../duotone-sea.css";
import "../window.css";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="" >
      <pre >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}