import { dbCreateApp } from "@/server/db/apps";
import { logger } from "../../../../../logger";
import { NextRequest, NextResponse } from "next/server";
import { createApiResponse } from "@/utils/api";


export async function POST(req: NextRequest) {
    try {
        const { name, description, logoUrl } = await req.json();

        // validation
        if (!name || !description || !logoUrl) {
            // return new Response(JSON.stringify({ error: 'Missing name, description, or logo URL' }), { status: 400 });
            return NextResponse.json(createApiResponse({ success: false, error: 'Missing name, description, or logo URL' }), { status: 400 });
        }

        await dbCreateApp({ name, description, logoUrl });

        return NextResponse.json(createApiResponse({ success: true, message: 'App created successfully' }), { status: 201 });

    } catch (error) {
        logger('❌ Error creating app:', error, { module: "/apps/create API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error creating the app' }), { status: 500 });
    }
}


