

export type Chat = {
    id: string;
    messages: Message[];
}

export type Message = {
    id: string;

    role: string;
    content: string;

    createdAt: string;
}


