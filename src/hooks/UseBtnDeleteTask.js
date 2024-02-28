export function UseBtnDeleteTask(id, refreshTasks, setRefreshTasks) {
	fetch(`http://localhost:3005/tasks/${id}`, {
		method: 'DELETE',
	})
		.then((rawResponse) => rawResponse.json())
		.then((response) => {
			setRefreshTasks(!refreshTasks);
		})
		.catch((error) => {
			console.error(error);
		});
}
