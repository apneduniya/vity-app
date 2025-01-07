'use server';

import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { logger } from '../../logger';


const API_KEY_LENGTH = 16;
class ApiKeyEncryption {
    private static readonly algorithm = 'aes-256-cbc';
    private static readonly encryptionKey = (() => {
        const key = process.env.API_KEY_ENCRYPTION_KEY;
        if (!key) {
            throw new Error('API_KEY_ENCRYPTION_KEY environment variable is not defined');
        }
        return Buffer.from(key, 'utf-8').subarray(0, 32);
    })();
    private static readonly ivLength = 16;

    static async encrypt(source: string): Promise<string> {
        try {
            const iv = randomBytes(this.ivLength);
            const cipher = createCipheriv(this.algorithm, this.encryptionKey, iv);
            const encrypted = Buffer.concat([cipher.update(source, 'utf8'), cipher.final()]);
            const result = Buffer.concat([iv, encrypted]);
            return result.toString('base64');
        } catch (error) {
            logger('Failed to encrypt API key', error, {
                module: 'ApiKeyEncryption',
                level: 'error',
            });
            throw new Error('Failed to encrypt API key');
        }
    }

    static async decrypt(encrypted: string): Promise<string> {
        try {
            if (!encrypted) {
                throw new Error('Missing encrypted API key');
            }

            const encryptedBuffer = Buffer.from(encrypted, 'base64');
            const iv = encryptedBuffer.subarray(0, this.ivLength);
            const encryptedContent = encryptedBuffer.subarray(this.ivLength);
            const decipher = createDecipheriv(this.algorithm, this.encryptionKey, iv);
            const decrypted = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
            return decrypted.toString('utf8');
        } catch (error) {
            logger('Failed to decrypt API key', error, {
                module: 'ApiKeyEncryption',
                level: 'error',
            });
            throw new Error('Failed to decrypt API key');
        }
    }
}

export async function generateApiKey(): Promise<string> {
    const apiKey = randomBytes(API_KEY_LENGTH).toString('hex');
    return ApiKeyEncryption.encrypt(apiKey);
}

export async function decryptApiKey(encryptedApiKey: string): Promise<string> {
    return ApiKeyEncryption.decrypt(encryptedApiKey);
}