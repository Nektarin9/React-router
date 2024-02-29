import style from "./Error.module.css"

export function Error() {
	return (
		<div className={style.container}>
			<h1 className={style.h1_error}>
				Ошибка 404, такой страницы не существует.
			</h1>
		</div>
	)
}

