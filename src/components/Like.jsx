import React, { useState, useEffect } from 'react';
import { IconArrowBigUp,IconArrowBigDown,IconArrowBigUpFilled ,IconArrowBigDownFilled  } from '@tabler/icons-react';

const Like = ({ slug }) => {
  const [totalLikes, setTotalLikes] = useState(undefined);
  const [likeStatus, setLikeStatus] = useState(null);
  const [s,_]=useState(slug)

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const response = await fetch(
          `/api/like?slug=${s}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTotalLikes(result.total);
      } catch (err) {
        setError(true);
      }
    };
    fetchLike()
    // Initialize the like status from localStorage
    const status = JSON.parse(localStorage.getItem(`likeStatus_${slug}`));
    if (status !== null) {
      setLikeStatus(status);
    }
  }, [slug]);

  const getUserLikeStatus = (slug) => {
    return JSON.parse(localStorage.getItem(`likeStatus_${slug}`)) || false;
  };

  const setUserLikeStatus = (slug, status) => {
    localStorage.setItem(`likeStatus_${slug}`, JSON.stringify(status));
    setLikeStatus(status);
  };

  const updateLike = async (slug, action) => {
    const currentStatus = getUserLikeStatus(slug);

    if ((action === 'add' && currentStatus === true) || (action === 'remove' && currentStatus === false)) {
      console.log('User has already performed this action.');
      return;
    }

    const response = await fetch(`/api/like?slug=${slug}&action=${action}`, {
      method: 'POST',
    });

    const data = await response.json();
    setTotalLikes(data.totalLikes);

    setUserLikeStatus(slug, action === 'add' ? true : false);
  };

  return (
    <div>
      <div className="pl-2 h-full flex items-center gap-2 border-l border-l-[#343841]">
        <button
          className="flex h-full items-center"
          id="like-button"totalLikes
          onClick={() => updateLike(slug, 'add')}
          disabled={likeStatus === true} 
        >
          {likeStatus==false||likeStatus==null?<IconArrowBigUp stroke={1} className="size-5"/>:<IconArrowBigUpFilled  stroke={1} className="size-5"/>}
        </button>
        <span>{totalLikes!==undefined?totalLikes:'-'}</span>
        <button
          className="flex h-full items-center"
          id="unlike-button"
          onClick={() => updateLike(slug, 'remove')}
          disabled={likeStatus === false} 
        >
          {likeStatus==true||likeStatus==null?<IconArrowBigDown stroke={1} className="size-5"/>:<IconArrowBigDownFilled  stroke={1} className="size-5"/>}
        </button>
      </div>
    </div>
  );
};

export default Like;
