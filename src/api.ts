export interface CommentData {
	id: string,
	timestamp: Date,
	author: string,
	text: string,
	comments: CommentData[]
}

interface ApiResponse {
	id: number,
	question: string,
	possibleAnsers: string[],
	correctAnswer: string,
}

function getMockComment(text: string, correctAnswer?: string): CommentData {
	const authors = ['Aang', 'Katara', 'Sokka', 'Suki', 'Toph', 'Zuko'];
	const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

	return {
		id: randomAuthor + text,
		timestamp: new Date(2021, 4, 20),
		author: randomAuthor,
		text,
		comments: text === correctAnswer ? [getMockComment('Correct!')] : [],
	};
}

function processData(data: ApiResponse[]): CommentData[] {
	return data.reverse().map(obj => {
		const result = getMockComment(obj.question);
		// This typo is in the API
		result.comments = obj.possibleAnsers
			.map((ans: string) => getMockComment(ans, obj.correctAnswer));

		return result;
	});
}

export async function fetchComments() {
	const baseURL = 'https://api.sampleapis.com/avatar/questions';
	const resp = await fetch(baseURL);

	const data = await resp.json();
	return processData(data);
}