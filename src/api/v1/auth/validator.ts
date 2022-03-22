import { validatorRules } from '../../../utils';

export default {
	login: [
		//
		validatorRules.username(),
		validatorRules.password(),
	],
};
