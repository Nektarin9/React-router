import style from './ModalWindow.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Loader } from '../index';
import { UseBtnDeleteTask, UseBtnChangeTask, UseObjectParams } from '../../hooks/hooks';
import { timeError } from '../../constants/constants';

export function ModalWindow({ tasks, refreshTasks, setRefreshTasks }) {
	const [inputChangeValue, setInputChangeValue] = useState('');
	const [inputError, setInputError] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [isError, setIsError] = useState(false);

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
		setInputChangeValue("")

	}
	const objParams = UseObjectParams(tasks);
	if (objParams.id || disabled) {
		return (
			<section className={style.background_modal}>
				<NavLink to={'/'}>
					<span className={style.close}>✕</span>
				</NavLink>

				<div className={style.modal_container}>
					<div className={style.task}>
						<p className={style.task_p}>
							{objParams.title || 'Задача удалена'}
						</p>
					</div>
					<div className={style.bnt_container}>
						<input
							value={inputChangeValue}
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
						<div className={style.conteiner_input}>
							<p className={style.p_input}>Выполнить задачу</p>
							<div className={style.checkboxWrapper2}>
								<input
									type="checkbox"
									className={`${style.scGJwTLC} ${style.ikxBAC}`}
									disabled={disabled}
									checked={
										disabled ? false : objParams.completed || false
									}
									onChange={({ target }) => {
										return UseBtnChangeTask(
											objParams.id,
											refreshTasks,
											setRefreshTasks,
											objParams.title,
											target.checked,
										);
									}}
								></input>
							</div>
						</div>
						<button
							disabled={disabled}
							onClick={changeTask}
							className={style.btn_task}
						>
							Изменить
						</button>

						<button
							disabled={disabled}
							onClick={() => {
								setDisabled(true);
								UseBtnDeleteTask(
									objParams.id,
									refreshTasks,
									setRefreshTasks,
								);
							}}
							className={style.btn_task_del}
						>
							Удалить
						</button>
					</div>
				</div>
			</section>
		);
	} else {
		setTimeout(() => {
			setIsError(true);
		}, timeError);
		return <Loader isError={isError} />;
	}
}
