import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { BadTokenError, InternalError, TokenExpiredError } from './ErrorBase';
import { sign, verify } from 'jsonwebtoken';
import logger from '../tools/logger';

export default class JWT {
    private static readPrivateKey(): Promise<string> {
        return promisify(readFile)(path.join(__dirname, '../../keys/private.pem'), 'utf8');
    }

    private static readPublicKey(): Promise<string> {
        return promisify(readFile)(path.join(__dirname, '../../keys/public.pem'), 'utf8');
    }

    public static async encode(payload: JwtPayload): Promise<string> {
        const cert = await this.readPrivateKey();
        if (!cert) throw new InternalError('Token generation failure');
        //@ts-ignore
        return promisify(sign)({ ...payload }, cert, { algorithm: 'RS256' });
    }

    public static async validate(token: string): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try {
            return (await promisify(verify)(token, cert)) as JwtPayload;
        } catch (e) {
            logger.debug(e);
            if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError();
            // throws error if the token has not been encrypted by the private key
            throw new BadTokenError();
        }
    }

    /**
     * Returns the decoded payload if the signature is valid even if it is expired
     */
    public static async decode(token: string): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try {
            //@ts-ignore
            return (await promisify(verify)(token, cert, { ignoreExpiration: true })) as JwtPayload;
        } catch (e) {
            logger.debug(e);
            throw new BadTokenError();
        }
    }
}

export class JwtPayload {
    aud: string;
    sub: string;
    iss: string;
    iat: number;
    exp: number;
    prm: string;

    constructor(issuer: string, audience: string, subject: string, param: string, validity: number) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
        this.prm = param;
    }
}
