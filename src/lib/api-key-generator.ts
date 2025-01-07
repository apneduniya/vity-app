import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const encryptionKey = Buffer.from(process.env.API_KEY_ENCRYPTION_KEY!, 'utf-8').subarray(0, 32);
const ivLength = 16;

export async function generateApiKey(): Promise<string> {
    const apiKey = randomBytes(32).toString('hex');
    return encrypt(apiKey);
}

export async function decryptApiKey(encryptedApiKey: string): Promise<string> {
    return decrypt(encryptedApiKey);
}

function encrypt(source: string): string {
    const iv = randomBytes(ivLength);
    const cipher = createCipheriv(algorithm, encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(source, 'utf8'), cipher.final()]);
    const result = Buffer.concat([iv, encrypted]);
    return result.toString('base64');
}

function decrypt(encrypted: string): string {
    const encryptedBuffer = Buffer.from(encrypted, 'base64');
    const iv = encryptedBuffer.subarray(0, ivLength);
    const encryptedContent = encryptedBuffer.subarray(ivLength);
    const decipher = createDecipheriv(algorithm, encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
    return decrypted.toString('utf8');
}