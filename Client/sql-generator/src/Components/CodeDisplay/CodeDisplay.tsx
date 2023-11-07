import React from "react";
import "./CodeDisplay.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface codeDisplayProps {
  text: string;
  loader: boolean;
}

function CodeDisplay({ text, loader }: codeDisplayProps) {
  const regex = /```([\s\S]+?)```/g;
  const matches = "" + text.match(regex);
  const finalResult =  matches.replaceAll("```", "").replaceAll(";", "\n");
  console.log(finalResult);
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      <div className="code-display">
        <div className="buttons">
          <button className="button first"></button>
          <button className="button second"></button>
          <button className="button third"></button>
        </div>
        <div className="code-output">
          {loader ? (
            <div className="loaders">
              <div className="loadingHeading">
                <p>
                  <Skeleton
                    baseColor="#ebebeb"
                    highlightColor="#f5f5f5"
                    className="cardImgLoading"
                    width={1000}
                    height={30}
                    count={1.5}
                    // Add animation to the loading skeletons
                    style={{
                      animation: "flashing 1.5s infinite",
                      background:
                        "linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </p>
              </div>
            </div>
          ) : (
            <p style={{ whiteSpace: "pre-wrap"}}>
              <pre style={{color:"rgb(255, 189, 45)"}}>{finalResult}</pre>
            </p>
            
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default CodeDisplay;
