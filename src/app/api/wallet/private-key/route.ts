import { NextResponse } from "next/server";
import { logger } from "../../../../../logger";
import { createApiResponse } from "@/utils/api";
import { decryptPrivateKey } from "@/lib/solana/wallet-generator";
import { validateApiKey } from "@/server/user";


export async function POST(req: Request) {
    try {
        const { apiKey } = await req.json();

        // validation
        if (!apiKey) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Missing API key' }), { status: 400 });
        }

        // Validate API key and get user with wallet
        const user = await validateApiKey(apiKey);

        if (!user) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Invalid API key' }), { status: 401 });
        }

        if (!user.wallets || user.wallets.length === 0) {
            return NextResponse.json(createApiResponse({ success: false, error: 'No wallet found for user' }), { status: 404 });
        }

        // Decrypt the private key
        const decryptedPrivateKey = await decryptPrivateKey(user.wallets[0].encryptedPrivateKey);

        logger('Private key retrieved successfully for user', user.id, {
            module: "/wallet/private-key API",
            level: 'info',
        });

        return NextResponse.json(createApiResponse({ 
            success: true, 
            data: { privateKey: decryptedPrivateKey } 
        }), { status: 200 });

    } catch (error) {
        logger('❌ Error retrieving private key:', error, { module: "/wallet/private-key API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error retrieving private key' }), { status: 500 });
    }
}
