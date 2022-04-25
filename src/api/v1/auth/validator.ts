import { validatorRules } from '../../../utils';

/**
 * Auth Validator
 */
export default {
	// Validation rules for register
	register: [validatorRules.username(), validatorRules.email(), validatorRules.password(), validatorRules.validate],
	// Validation rules for login
	login: [validatorRules.username(), validatorRules.password(), validatorRules.validate],
};
