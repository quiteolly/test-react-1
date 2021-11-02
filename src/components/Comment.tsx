import { useState } from 'react';
import { CommentData } from '../api';
import './Comment.css';

import CommentForm from './CommentForm';

interface CommentProps {
	comment: CommentData,
	level: number,
	onUpdateComment: (comment: CommentData) => void,
}

function Comment({ comment, level, onUpdateComment }: CommentProps) {
	const [isReplying, setIsReplying] = useState(false);

	function updateChild(child: CommentData) {
		onUpdateComment({
			...comment,
			comments: comment.comments.map(c => c.id === child.id ? child : c),
		});
	}

	function onAdd(c: CommentData) {
		onUpdateComment({
			...comment,
			comments: [...comment.comments, c],
		});
		setIsReplying(false);
	}

	function showDate(date: Date) {
		return date.toLocaleString('en-GB', {
			timeStyle: 'short',
			dateStyle: 'long',
			timeZone: 'UTC',
		});
	}

	function toggleForm() {
		setIsReplying(!isReplying);
	}

	return (
		<li className={`Comment Comment--level-${level}`}>
			<figure className="Comment__body">
				<figcaption>
					<strong className="Comment__author">{comment.author}</strong>
					<time className="Comment__timestamp" dateTime={comment.timestamp.toISOString()}>{showDate(comment.timestamp)}</time>
				</figcaption>
				<div className="Comment__content">
					<p>{comment.text}</p>
				</div>
				<footer>
					<button className="Comment__reply-button" onClick={toggleForm}>
						{isReplying ? 'Cancel reply' : 'Reply'}
					</button>
				</footer>
			</figure>
			{isReplying && <CommentForm parent={comment} onAdd={onAdd} />}
			{comment.comments.length > 0 && <ol className="Comment__replies">
				{comment.comments.map((data) => <Comment key={data.id} level={level + 1} comment={data} onUpdateComment={updateChild} />)}
			</ol>}
		</li>
	)
}

export default Comment;