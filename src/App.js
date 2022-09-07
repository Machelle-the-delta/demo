import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/main.scss";

import CardComponent from "../src/components/CardComponent/CardComponent";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import TooltipComponent from "./components/TooltipComponent/TooltipComponent";

function App() {
  const [tooltipInfo, setTooltipInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTooltipInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.jsonbin.io/b/6128c389c5159b35ae04d4ed/1");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedTooltipInfo = data.results.map((tooltipData) => {
        return {
          title: tooltipData.title,
        };
      });
      setTooltipInfo(transformedTooltipInfo);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTooltipInfo();
  }, [fetchTooltipInfo]);

  // function addTooltipInfo(tooltipData) {
  //   console.log(tooltipData);
  // }

  let content = <p>Found no content.</p>;

  if (tooltipInfo.length > 0) {
    content = <TooltipComponent tooltipInfo={tooltipInfo} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const headerTitle = {
    title: "Insights",
  };

  const cardContent = [
    {
      header: "Public information",
      body: "Bankruptcies and individual voluntary arrangements can damage your score",
      impact: "High Impact",
    },
    {
      header: "Credit utilisation",
      body: "Using more than 50% of your available credit can damage your score",
      impact: "Medium Impact",
    },
    {
      header: "Electoral roll",
      body: "Being on the electoral roll can improve your score",
      impact: "Medium Impact",
    },
  ];
  return (
    <div>
      <HeaderComponent title={headerTitle.title} />

      <div className="container">
        <div className="row">
          <div>
            <div>
              <TooltipComponent direction="right" content={content}>
                <CardComponent
                onClick={fetchTooltipInfo}
                  className="col-sm-46"
                  header={cardContent[0].header}
                  body={cardContent[0].body}
                  impact={cardContent[0].impact}
                />
              </TooltipComponent>
            </div>
            <CardComponent
              className="col-sm-6"
              header={cardContent[1].header}
              body={cardContent[1].body}
              impact={cardContent[1].impact}
            />
            <CardComponent
              className="col-sm-6"
              header={cardContent[2].header}
              body={cardContent[2].body}
              impact={cardContent[2].impact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
