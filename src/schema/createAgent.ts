"use client"

import { z } from "zod"


export const createAgentFormSchema = z.object({
    agentName: z.string().min(2).max(10),
    agentDescription: z.string().min(10).max(100), // short description
    agentCategory: z.string().array().min(1).max(5), // category
    agentpricing: z.number().min(1).max(1000), // per hour (in dollars)
    agentDeployYML: z.string().min(10).max(1000), // spheron deploy yml
})