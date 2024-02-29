import React from 'react';
import { useEffect, useState } from 'react';
import { HomePage, ModalWindow, Error } from './components/index';
import { Routes, Route, Navigate } from 'react-router-dom';

export function App() {
	const [tasks, setTasks] = useState([]);
	const [refreshTasks, setRefreshTasks] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3005/tasks')
			.then((loadedData) => {
				return loadedData.json();
			})
			.then((response) => {
				setTasks(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [refreshTasks]);
	return (
		<Routes>
			<Route
				path="/"
				element={
					<HomePage
						tasks={tasks}
						refreshTasks={refreshTasks}
						setRefreshTasks={setRefreshTasks}
					/>
				}
			/>
			<Route
				path={'/task/:id'}
				element={
					<ModalWindow
						refreshTasks={refreshTasks}
						setRefreshTasks={setRefreshTasks}
						tasks={tasks}
					/>
				}
			/>
			<Route path="/404" element={<Error />} />
			<Route path={`*`} element={<Navigate to="/404" />} />
		</Routes>
	);
}
