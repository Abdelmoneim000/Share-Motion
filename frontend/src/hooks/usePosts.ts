// src/hooks/usePosts.ts
"use client";

import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import { MockPostsService } from '@/services/mock/posts.mock';

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const data = await MockPostsService.getAll();
                setPosts(data);
            } catch (err) {
                setError("Failed to load posts.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return { posts, loading, error };
}
