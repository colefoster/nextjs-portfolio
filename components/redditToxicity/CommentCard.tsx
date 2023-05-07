// components/CommentCard.tsx

import React from 'react'

const CommentCard = ({ comment, toxicityLabels, toxicityResult }) => {
  return (
    <div className="p-4 rounded-md border border-gray-300 mb-4 w-full">
      <div className="flex items-center mb-2">
        <a href={comment.permalink} className="text-blue-500 hover:text-blue-700 mr-2">
          {comment.link_title} &nbsp;
          {comment.subreddit_name_prefixed}
        </a>
        <span className="text-gray-500">Score: {comment.score}</span>
      </div>
      <div className="mb-2">
        {comment.body}
      </div>
      <div className="mb-2">
        {comment.author_flair_text && (
          <span className="badge badge-primary">{comment.author_flair_text}</span>
        )}
        {comment.author_flair_richtext.map((flair, index) => {
          {flair.e === 'emoji' && (
            <img key={index} src={flair.u} alt={flair.a} className="w-4 h-4 inline-block mr-1" />
          )}
          })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {toxicityLabels.map((label) => (
          <div key={label} className="flex items-center">
            <span className={`${Number(toxicityResult[label].replace("%","")) > 2 ? 'badge badge-accent  tracking-tighter animate-pulse font-bold' : 
            (Number(toxicityResult[label].replace("%","")) > 1 ? 'badge badge-primary' : 'badge')}`}>
            {label.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}: &nbsp;
            {toxicityResult[label]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentCard
