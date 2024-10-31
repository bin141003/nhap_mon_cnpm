export class DataResponse {
	errCode: number;
	data: any;
	message: string;
	constructor(errCode: number, data: any, message: string) {
		this.errCode = errCode;
		this.data = data;
		this.message = message;
	}
}
