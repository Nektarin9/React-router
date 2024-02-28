import React from 'react';
import { useState, useRef } from 'react';

import style from './HomePage.module.css';
import { UseAddTasks } from '../../hooks/UseBtnAddTask.js';
import { ShowTasks } from '../ShowTasks/ShowTasks.js';
export function HomePage({
	tasks,
	refreshTasks,
	setRefreshTasks,
}) {
	const [filter, setFilter] = useState('');
	const [newTask, setNewTask] = useState('');
	const [stateBtnSort, setStateBtnSort] = useState(false);
	const inputRef = useRef(null);
	const { btnAddTasks, errorNewTask } = UseAddTasks(
		refreshTasks,
		setRefreshTasks,
		newTask,
		tasks,
		inputRef,
	);
	function filterTasks(event) {
		const { target } = event;
		if (target.value) {
			setFilter(target.value);
		} else {
			setFilter('');
		}
	}
	return (
		<>
			<h1>Список задач</h1>
			<input
				onChange={filterTasks}
				placeholder="Поиск"
				className={style.input_search}
				type="text"
			></input>
			<div className={style.bnt_container}>
				<button
					onClick={() => {
						setNewTask('');
						btnAddTasks();
					}}
					className={style.btn_task}
				>
					Добавить
				</button>
				<input
					value={newTask}
					onChange={({ target }) => setNewTask(target.value)}
					ref={inputRef}
					type="text"
					placeholder="Добавить задачу"
					className={
						errorNewTask
							? `${style.input_add} ${style.input_add_error}`
							: style.input_add
					}
				></input>
			</div>
			<button
				onClick={() => setStateBtnSort(!stateBtnSort)}
				className={style.btn_task_sort}
			>
				Сортировать
			</button>
			<section className={style.container_tasks}>
				<ShowTasks stateBtnSort={stateBtnSort} str={filter} tasks={tasks} />
			</section>
		</>
	);
}
