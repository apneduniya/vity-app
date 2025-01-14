

export type Action = {
    id: string;
    appId: string;

    name: string;
    description: string;

    createdAt: Date;
    updatedAt: Date;

    app: App;
}


export type App = {
    id: string;

    name: string;
    description: string;
    logoUrl: string;
    docsLink: string;
    category: string;

    createdAt: Date;
    updatedAt: Date;

    actions?: Action[];
}



