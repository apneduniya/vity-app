"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createAgentFormSchema } from "@/schema/createAgent";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";


export default function CreateNewAgentForm() {
    const form = useForm<z.infer<typeof createAgentFormSchema>>({
        resolver: zodResolver(createAgentFormSchema),
        defaultValues: {
            agentName: "",
            agentDescription: "",
            agentCategory: [],
            agentpricing: 0,
            agentDeployYML: "",
        },
    })

    function onSubmit(values: z.infer<typeof createAgentFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto space-y-8 max-w-[600px]">
                    <FormField
                        control={form.control}
                        name="agentName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agent name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agentDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agent description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agentCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agent category" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agentpricing"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Pricing (in USD per hour)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter agent pricing" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agentDeployYML"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Deploy YML</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter agent deploy YML" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Make sure that the YML is correct and valid. You can learn more about writing the deploy YML from 
                                    <Link href="https://docs.spheron.network/user-guide/icl" className="underline pl-1.5" target="_blank">
                                        here
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    )
}


