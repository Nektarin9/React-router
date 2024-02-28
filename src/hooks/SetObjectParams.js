import { useParams } from 'react-router-dom';

export function UseObjectParams(tasks) {
	let params = useParams();
	params = params[Object.keys(params)[0]].slice(1);
	let objParams = {};
	tasks.forEach((element) => {
		if (element.id === params) {
			objParams = element;
		}
	});
	return objParams;
}
