import { dbCreateApp } from "@/server/db/apps/create";
import { logger } from "../../../../../logger";


export async function POST(req: Request) {
    try {
        const { name, description, logoUrl } = await req.json();

        // validation
        if (!name || !description || !logoUrl) {
            return new Response(JSON.stringify({ error: 'Missing name, description, or logo URL' }), { status: 400 });
        }

        await dbCreateApp({ name, description, logoUrl });

        return new Response(JSON.stringify({ success: true }), { status: 201 });

    } catch (error) {
        logger('❌ Error creating app:', error, { module: "/apps/create API", level: 'error' });
        return new Response(JSON.stringify({ error: 'Error creating app' }), { status: 500 });
    }
}


