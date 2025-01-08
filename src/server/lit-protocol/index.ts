'use server';

import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LIT_NETWORK } from '@lit-protocol/constants';
import { AuthSig, SessionSigs, SolRpcConditions } from '@lit-protocol/types';
import ipfsOnlyHash from 'typestub-ipfs-only-hash';
import { logger } from '../../../logger';


export const getLitNodeClient = async (
    litNetwork: (typeof LIT_NETWORK)[keyof typeof LIT_NETWORK]
) => {
    logger(`🔄 Connecting LitNodeClient to the ${litNetwork} network...`, undefined, { module: "lit-protocol", level: 'info' });
    const litNodeClient = new LitNodeClient({
        litNetwork,
        debug: false,
    });
    await litNodeClient.connect();
    logger(`✅ Connected LitNodeClient to the ${litNetwork} network`, undefined, { module: "lit-protocol", level: 'info' });
    return litNodeClient;
};

export const calculateLitActionCodeCID = async (input: string) => {
    try {
        const cid = await ipfsOnlyHash.of(input);
        return cid;
    } catch (error) {
        logger('Error calculating CID for litActionCode:', error, { module: "lit-protocol", level: 'error' });
        throw error;
    }
};

export const getAccessControlConditions = async (solanaPublicKey: string) => {
    logger('🔄 Generating access control conditions...', undefined, { module: "lit-protocol", level: 'info' });
    const accessControlConditions: SolRpcConditions = [
        {
            method: '',
            params: [':userAddress'],
            pdaParams: [],
            pdaInterface: { offset: 0, fields: {} },
            pdaKey: '',
            chain: 'solana',
            returnValueTest: {
                key: '',
                comparator: '=',
                value: solanaPublicKey,
            },
        },
        //   { operator: 'and' },
        //   {
        //     method: '',
        //     params: [':currentActionIpfsId'],
        //     pdaParams: [],
        //     pdaInterface: { offset: 0, fields: {} },
        //     pdaKey: '',
        //     chain: 'solana',
        //     returnValueTest: {
        //       key: '',
        //       comparator: '=',
        //       value: await calculateLitActionCodeCID(litActionCodeDecrypt),
        //     },
        //   },
    ];
    logger('✅ Generated access control conditions', undefined, { module: "lit-protocol", level: 'info' });
    return accessControlConditions;
};

export const encryptString = async (
    litNodeClient: LitNodeClient,
    accessControlConditions: SolRpcConditions,
    message: string
) => {
    logger('🔄 Encrypting the string...', undefined, { module: "lit-protocol", level: 'info' });
    const { ciphertext, dataToEncryptHash } = await litNodeClient.encrypt({
        dataToEncrypt: new TextEncoder().encode(message),
        solRpcConditions: accessControlConditions,
    });
    logger('✅ Encrypted the string', undefined, { module: "lit-protocol", level: 'info' });
    return { ciphertext, dataToEncryptHash };
};


