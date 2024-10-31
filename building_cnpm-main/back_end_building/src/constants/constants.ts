//HTTP
const RESPONSE_SUCCESS = 200;
const SYSTEM_ERROR = 500;
const CONFLICT_ERROR = 409;
const PERMISSION_ERROR = 401; //not enough authorization
const SESSION_ERROR = 403; //no-session
const NOROUTE_ERROR = 404; //no-route
const NOT_ACCEPTABLE = 406; //not acceptable
const BAD_REQUEST = 400; //bad request


export {
	CONFLICT_ERROR,
	PERMISSION_ERROR,
	RESPONSE_SUCCESS,
	SYSTEM_ERROR,
	SESSION_ERROR,
	NOROUTE_ERROR,
	NOT_ACCEPTABLE,
	BAD_REQUEST,
};