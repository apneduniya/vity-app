import { NextResponse } from "next/server";
import { logger } from "../../../../../logger";
import { createApiResponse } from "@/utils/api";
import { dbSearchApps } from "@/server/db/apps";


export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        // validation
        if (!query) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Missing query' }), { status: 400 });
        }

        const apps = await dbSearchApps(query);

        return NextResponse.json(createApiResponse({ success: true, data: apps }), { status: 200 });

    } catch (error) {
        logger('❌ Error searching the app:', error, { module: "/apps/search API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error searching the app' }), { status: 500 });
    }
}


