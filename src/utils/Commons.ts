import { Response, Request, NextFunction } from 'express';
export interface wrapperResponse {
	success: boolean;
	error?: any;
	data?: any;
	message: string;
}
export class Commons {
    /**
     * Crea un wrapper sobre la respuesta enviada, para visualizar los errores se requiere el entorno de desarrollo
     * @method sendResponse
     * @param msj
     * @param data
     * @param err
     * @returns wrapperResponse
    */
	public static sendResponse(msj: string, data?: object, err = null) {
		let res: wrapperResponse;
		if (err) {
			let development = process.env.NODE_ENV.trim() !== "prodution";
			if (development) {
				res = { success: false, error: err, message: msj };
			} else {
				res = { success: false, message: msj };
			}
		} else {
			if (data) {
				res = { success: true, data: data, message: msj };
			} else {
				res = { success: true, message: msj };
			}
		}
		return res;
	}
    /**
     * name
     */
	public static isPermit() {

	}
}
