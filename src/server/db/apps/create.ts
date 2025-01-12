"use server"

import prisma from "@/lib/prisma";
import { NewApp } from "@/types/db";
import { logger } from "../../../../logger";

/**
 * Creates a new app in the database
 * 
 * @param app 
 * @returns 
 */
export async function dbCreateApp(app: NewApp) {
    try {
        await prisma.app.create({
            data: {
                name: app.name,
                description: app.description,
                logoUrl: app.logoUrl,
            },
        });
    } catch (error) {
        logger('Error creating app:', error, { module: "db/apps/create", level: 'error' });
        return undefined;
    }
}


