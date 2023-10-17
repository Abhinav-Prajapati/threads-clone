"use server";

import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export const createThread = async ({
    text,
    author,
    communityId,
    path,
}: Params) => {
    try {
        connectToDB();
        const createdThread = await Thread.create({
            text: text,
            author: author,
            community: null,
        });

        //update user model after creating thread
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`failed to create your thread ${error.message}`);
    }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
    try {
        connectToDB();
        const skipPosts = (pageNumber - 1) * pageSize;
        const postsQuery = Thread.find({
            parentId: { $in: [null, undefined] },
        })
            .sort({ createdAt: "desc" })
            .skip(skipPosts)
            .limit(pageSize)
            .populate({ path: "author", model: User })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: "User",
                    select: "_id name parentId image",
                },
            });
            const totalPostsCount = await Thread.countDocuments({parentId :{$in:[null,undefined]}});
            const posts = await postsQuery.exec();
            const isNext:boolean = totalPostsCount>(skipPosts + posts.length);
            return {posts , isNext};
    } catch (error: any) {
        throw new Error(`failed to fetch posts ${error.message}`);
    }
};
