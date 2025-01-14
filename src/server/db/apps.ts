"use server"

import prisma from "@/lib/prisma";
import { NewApp } from "@/types/db";
import { logger } from "../../../logger";


/**
 * Creates a new app in the database
 * 
 * @param app 
 * @returns 
 */
export async function dbCreateApp(app: NewApp) {
    try {
        const createdApp = await prisma.app.create({
            data: {
                name: app.name,
                description: app.description,
                logoUrl: app.logoUrl,
                docsLink: app.docsLink,
                category: app.category,
            },
        });
        logger('App created successfully:', createdApp, { module: "db/apps", level: 'info' });
        return createdApp;
    } catch (error) {
        logger('Error creating the app:', error, { module: "db/apps", level: 'error' });
        return undefined;
    }
}


/**
 * Get many apps from the database with pagination
 * 
 * @param limit - The number of apps to retrieve (default is 100)
 * @param offset - The number of apps to skip (default is 0)
 * @returns
 */
export async function dbGetManyApps(limit: number = 100, offset: number = 0) {
    try {
        const apps = await prisma.app.findMany({
            take: limit,
            skip: offset,
        });
        return apps;
    } catch (error) {
        logger('Error getting apps:', error, { module: "db/apps", level: 'error' });
        return undefined;
    }
}

/**
 * Get a single app from the database
 * 
 * @param id - The ID of the app to retrieve
 * @returns
 */
export async function dbGetSingleApp(id: string) {
    try {
        const app = await prisma.app.findUnique({
            where: { id },
        });
        return app;
    } catch (error) {
        logger('Error getting single app:', error, { module: "db/apps", level: 'error' });
        return undefined;
    }
}

/**
 * Search for apps in the database by name, description, or category
 * 
 * @param query - The search query to look for in name, description, or category
 * @returns
 */
export async function dbSearchApps(query: string) {
    try {
        const apps = await prisma.app.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        category: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
        return apps;
    } catch (error) {
        logger('Error searching apps:', error, { module: "db/apps", level: 'error' });
        return undefined;
    }
}


