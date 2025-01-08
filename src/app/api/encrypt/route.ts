import { LIT_NETWORK as _LIT_NETWORK } from '@lit-protocol/constants';
import { getAccessControlConditions, encryptString, getLitNodeClient } from '@/server/lit-protocol';
import { logger } from '../../../../logger';


const LIT_NETWORK = process.env.LIT_NETWORK ?? _LIT_NETWORK.DatilDev;

export async function POST(req: Request) {
    try {
        const { publicKey, data } = await req.json();

        // validation
        if (!publicKey || !data) {
            return new Response(JSON.stringify({ error: 'Missing public key or data' }), { status: 400 });
        }

        // @ts-expect-error: LIT_NETWORK type mismatch (it thinks LIT_NETWORK is a string)
        const litNodeClient = await getLitNodeClient(LIT_NETWORK);

        const accessControlConditions = await getAccessControlConditions(publicKey);
        const { ciphertext, dataToEncryptHash } = await encryptString(
            litNodeClient,
            accessControlConditions,
            data
        );

        await litNodeClient.disconnect();

        return new Response(JSON.stringify({ ciphertext, dataToEncryptHash }), { status: 200 });
    } catch (error) {
        logger('❌ Error encrypting data:', error, { module: "/encrypt API", level: 'error' });
        return new Response(JSON.stringify({ error: 'Encryption failed' }), { status: 500 });
    }
}
