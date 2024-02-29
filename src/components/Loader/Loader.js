import style from './loader.module.css';
import { NavLink } from 'react-router-dom';

export function Loader({ isError }) {
	return (
		<div className={style.container}>
			<div className={style.conteiner_loader}>
				<span className={style.loader}></span>
				{isError ? (
					<>
						<p className={style.pError}>404 такой задачи не существует.</p>
						<NavLink to={'/'}>
							<span className={style.pBack}>Вернуться назад</span>
						</NavLink>
					</>
				) : null}
			</div>
		</div>
	);
}
