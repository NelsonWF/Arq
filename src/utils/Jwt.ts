import * as uid from 'uuid';
import * as secureRandom from 'secure-random';
import * as nJwt from 'njwt';
import { log } from './Logger';
let keySignature = secureRandom(256, { type: 'Buffer' });
export interface claims {
	jti?;
	iat?;
	exp?;
	nbf?;
	iss;
	sub;
	scope?;
};

export class Jwt {
	public static create() {
		let claims: claims = {
			iss: "http://localhost:8080",
			sub: "users/users123456",
			scope: "admin, client"
		};
		return nJwt.create(claims, keySignature).compact();
	}
	public static verify(token) {
		nJwt.verify(token, keySignature, (err, bodyJwt) => {
			log.info("validar token");
			log.info(JSON.stringify(bodyJwt));
			if (err) {
				log.error(err);
				return false;
			}
			else {
				return true;
			}
		});
	}
}
