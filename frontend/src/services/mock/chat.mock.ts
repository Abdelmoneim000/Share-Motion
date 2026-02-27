// src/services/mock/chat.mock.ts

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

export interface Thread {
    id: string;
    participant: {
        id: string;
        name: string;
        avatarColor: string;
        role: string;
    };
    messages: Message[];
    unreadCount: number;
}

const MOCK_THREADS: Thread[] = [
    {
        id: 't-1',
        participant: { id: 'u-2', name: 'Sarah Manager', avatarColor: 'bg-indigo-500', role: 'Manager' },
        unreadCount: 2,
        messages: [
            { id: 'm-1', senderId: 'u-2', text: 'Hey, can we adjust the caption on the summer post?', timestamp: '2023-10-25T10:30:00Z' },
            { id: 'm-2', senderId: 'me', text: 'Sure thing, what did you have in mind?', timestamp: '2023-10-25T10:32:00Z' },
            { id: 'm-3', senderId: 'u-2', text: 'Maybe emphasize the limited time offer more?', timestamp: '2023-10-25T10:35:00Z' },
        ]
    },
    {
        id: 't-2',
        participant: { id: 'u-4', name: 'Alex Creator', avatarColor: 'bg-purple-500', role: 'Influencer' },
        unreadCount: 0,
        messages: [
            { id: 'm-4', senderId: 'me', text: 'Loved the draft video! It looks amazing.', timestamp: '2023-10-24T14:20:00Z' },
            { id: 'm-5', senderId: 'u-4', text: 'Thanks! Glad you liked it. Ready to post?', timestamp: '2023-10-24T14:25:00Z' },
        ]
    }
];

export const MockChatService = {
    async getThreads(): Promise<Thread[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...MOCK_THREADS];
    },

    async sendMessage(threadId: string, text: string): Promise<Message> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: Math.random().toString(36).substr(2, 9),
            senderId: 'me',
            text,
            timestamp: new Date().toISOString()
        };
    }
};
