import { dbGetManyApps } from "@/server/db/apps";
import { logger } from "../../../../logger";
import { createApiResponse } from "@/utils/api";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const body = await req.text();
        const { limit, offset } = body ? JSON.parse(body) : {};

        const apps = await dbGetManyApps(
            limit ? Number(limit) : undefined,
            offset ? Number(offset) : undefined
        );
        if (!apps) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Error getting the list of apps' }), { status: 500 });
        }

        return NextResponse.json(createApiResponse({ success: true, data: apps }), { status: 200 });

    } catch (error) {
        logger('❌ Error getting the list of apps:', error, { module: "/apps API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error getting the list of apps' }), { status: 500 });
    }
}


