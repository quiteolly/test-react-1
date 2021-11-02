import React, { useEffect, useState } from 'react';
import { CommentData } from '../api';
import './CommentForm.css';

const currentAuthorKey = 'comment-author';

interface CommentFormProps {
	parent?: CommentData,
	noAutoFocus?: boolean,
	onAdd: (comment: CommentData) => void,
}

function CommentForm({ parent, noAutoFocus, onAdd }: CommentFormProps) {
	const authorId = `comment-author-${Math.random()}`;
	const textId = `comment-text-${Math.random()}`;

	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');
	const [isPosted, setIsPosted] = useState(false);

	useEffect(() => {
		const currentAuthor = localStorage.getItem(currentAuthorKey);
		if (currentAuthor !== null) setAuthor(currentAuthor);
	}, []);

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter') {
			processComment();
		}
	}

	function processComment(e?: React.FormEvent) {
		e?.preventDefault();

		const timestamp = new Date();
		const comment = {
			id: timestamp.toISOString(),
			timestamp,
			author,
			text,
			comments: [],
		}

		onAdd(comment);

		localStorage.setItem(currentAuthorKey, author);
		setText('');
		setIsPosted(true);
		setTimeout(() => setIsPosted(false), 10000);
	}

	return (
		<div className="CommentForm">
			<h2 className="CommentForm__header">
				{parent?.author ? 'Reply to ' + parent.author : 'Leave a comment'}
			</h2>
			<form onKeyDown={onKeyDown} onSubmit={processComment}>
				<div className="CommentForm__field">
					<label htmlFor={authorId}>Your name</label>
					<input autoFocus={!noAutoFocus} id={authorId} name="author" type="text" value={author} required onChange={(e) => setAuthor(e.currentTarget.value)} />
				</div>
				<div className="CommentForm__field">
					<label htmlFor={textId}>Your comment</label>
					<textarea id={textId} name="text" value={text} required onChange={(e) => setText(e.currentTarget.value)} />
				</div>
				<button className="CommentForm__button" type="submit">Post comment</button>
				{isPosted &&
					<div className="sr-only" role="alert">Your comment was posted.</div>
				}
			</form>
		</div>
	);
}

export default CommentForm;