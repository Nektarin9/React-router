import style from './ModalWindow.module.css';
import { UseBtnDeleteTask } from '../../hooks/UseBtnDeleteTask';
import { useState } from 'react';
import { UseBtnChangeTask } from '../../hooks/UseBtnChangeTask';
import { NavLink } from 'react-router-dom';
import { UseObjectParams } from '../../hooks/SetObjectParams';
export function ModalWindow({ tasks, refreshTasks, setRefreshTasks }) {
	const [inputChangeValue, setInputChangeValue] = useState('');
	const [inputError, setInputError] = useState(false);
	const [disabled, setDisabled] = useState(false);
	function changeTask() {
		if (inputChangeValue.trim() !== '') {
			UseBtnChangeTask(
				objParams.id,
				refreshTasks,
				setRefreshTasks,
				inputChangeValue,
				false,
			);
		} else {
			setInputError(true);
		}
	}
	const objParams = UseObjectParams(tasks);

	return (
		<section className={style.background_modal}>
			<NavLink to={'/'}>
				<span className={style.close}>Закрыть</span>
			</NavLink>

			<div className={style.modal_container}>
				<div className={style.task}>
					<p className={style.task_p}>{objParams.title || 'Задача удалена'}</p>
					</div>
				<div className={style.bnt_container}>
					<input
						disabled={disabled}
						onChange={({ target }) => setInputChangeValue(target.value)}
						placeholder="Изменить задачу"
						type="text"
						className={
							inputError
								? `${style.input_change} ${style.input_add_error}`
								: style.input_change
						}
					></input>
					<button onClick={changeTask} className={style.btn_task}>
						Изменить
					</button>
					<input
						disabled={disabled}
						type="checkbox"
						checked={disabled ? false : objParams.completed || false}
						className={style.btn_task_completed}
						onChange={({ target }) => {
							console.log(target.checked);
							return UseBtnChangeTask(
								objParams.id,
								refreshTasks,
								setRefreshTasks,
								objParams.title,
								target.checked,
							);
						}}
					></input>

					<button
						disabled={disabled}
						onClick={() => {
							setDisabled(true);
							UseBtnDeleteTask(objParams.id, refreshTasks, setRefreshTasks);
						}}
						className={style.btn_task_del}
					>
						Удалить
					</button>
				</div>
			</div>
		</section>
	);
}
