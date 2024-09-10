import React from 'react';
import  { memo, useMemo } from 'react';
import './post.css';





const FCPost = memo(({ user, content, image, timestamp, likes, comments, reposts }) => {
  const formattedDate = useMemo(() => new Date(timestamp).toLocaleString(), [timestamp]);

  return (
    <div className="post">
      <div className="post-header">
        <img src={user.avatar} alt="User Avatar" className="avatar" loading="lazy" />
        <div className="post-info">
          <h3>{user.name}</h3>
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        {image && <picture>
  <source
    srcSet="https://via.placeholder.com/600x400.webp"
    type="image/webp"
  />
  <img
    src="https://via.placeholder.com/600x400"
    srcSet="
      https://via.placeholder.com/300x200 300w,
      https://via.placeholder.com/600x400 600w,
      https://via.placeholder.com/1200x800 1200w
    "
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
    alt="Post Content"
    className="post-image"
    loading="eager"
  />
</picture>}
      </div>
      <div className="post-reactions">
        <div className="reaction-icons">
          <span className="reaction like"></span>
          <span className="reaction love"></span>
          <span className="reaction celebrate"></span>
          <span className="reaction-count">{likes}</span>
        </div>
        <div className="comment-repost">
          <span>{comments} Comments</span> · <span>{reposts} Reposts</span>
        </div>
      </div>
      <div className="post-actions">
        <button><i className="like-icon"></i> Like</button>
        <button><i className="comment-icon"></i> Comment</button>
        <button><i className="share-icon"></i> Share</button>
      </div>
    </div>
  );
});

export default FCPost;
