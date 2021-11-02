import { useEffect, useState } from 'react';
import './App.css';

import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import { CommentData, fetchComments } from './api';

function App() {
	const [comments, setComments] = useState<CommentData[]>([]);

	useEffect(() => {
		let active = true;
		load();
		return () => { active = false }

		async function load() {
			const res = await fetchComments();
			if (!active) { return }
			setComments(res);
		}
	}, []);

	function updateChild(child: CommentData) {
		setComments(comments.map(c => c.id === child.id ? child : c));
	}

	function onAdd(c: CommentData) {
		setComments([c, ...comments]);
	}

	return (
		<div className="App">
			<CommentForm noAutoFocus onAdd={onAdd} />
			<h2>{comments.length} {comments.length === 1 ? 'comment' : 'comments' }</h2>
			<ol>
				{comments.map((data) => <Comment level={1} key={data.id} comment={data} onUpdateComment={updateChild} />)}
			</ol>
		</div>
	);
}

export default App;
