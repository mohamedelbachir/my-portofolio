import React, { useState, useEffect } from "react";

const ViewCounter = ({ slug }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [s,_]=useState(slug)
  function hasViewed(slug) {
    return sessionStorage.getItem(`viewed_${slug}`) !== null;
  }

  function setViewed(slug) {
    sessionStorage.setItem(`viewed_${slug}`, true);
  }
  useEffect(() => {
    const fetchView = async () => {
      try {
        const response = await fetch(
          `/api/views?${new URLSearchParams({ slug })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(true);
      }
    };
    const addView = async () => {
      try {
        const response = await fetch(
          `/api/views?${new URLSearchParams({ slug })}`,
          {
            method:"POST"
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setViewed(s);
        setData(result);
      } catch (err) {
        setError(true);
      }
    };
    if (hasViewed(s)) {
      console.log("View count already updated in this session.");
      fetchView();
    }else{
      addView();
    }
    
  }, [slug]);

  if (error) {
    return <span>1</span>;
  }

  return <span className="pr-2">{data ? data.total + " view(s)" : "---"}</span>;
};

export default ViewCounter;
