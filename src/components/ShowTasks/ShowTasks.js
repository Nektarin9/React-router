import style from './showTasks.module.css';
import { NavLink } from 'react-router-dom';
export function ShowTasks({ str, tasks, stateBtnSort }) {
	let array = [];
	let sortArray = [...tasks];
	if (stateBtnSort) {
		sortArray.sort((a, b) => {
			if (a.title < b.title) {
				return -1;
			}
			if (a.title > b.title) {
				return 1;
			}
			return 0;
		});
	}

	if (stateBtnSort) {
		for (let i = 0; i < sortArray.length; i++) {
			if (sortArray[i].title.toLowerCase().includes(str.toLowerCase())) {
				array.push(sortArray[i]);
			}
		}
	} else {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].title.toLowerCase().includes(str.toLowerCase())) {
				array.push(tasks[i]);
			}
		}
	}
	return array.map((item) => (
		<NavLink to={`/task/:${item.id}`}
			key={item.id}
			id={item.id}
			className={
				item.completed
					? `${style.task} ${style.task_completed_true}`
					: `${style.task} ${style.task_completed_false}`
			}
		>
			{item.title}
		</NavLink>
	));
}
