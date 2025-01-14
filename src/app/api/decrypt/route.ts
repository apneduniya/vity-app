import { createApiResponse } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json(createApiResponse({ success: true, message: 'Decrypted successfully' }), { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Error decrypting the data' }, { status: 500 });
    }
}