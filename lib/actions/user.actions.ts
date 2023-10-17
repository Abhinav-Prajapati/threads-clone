"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface params {
    userId: string,
    name: string,
    userName: string,
    bio: string,
    image: string,
    path: string
}
export const updateUser = async ({
    userId,
    name,
    userName,
    bio,
    image,
    path,
}: params): Promise<void> => {
    try {
        connectToDB();
        User.findOneAndUpdate(
            { id: userId },
            {
                username: userName.toLowerCase(),
                name: name,
                bio: bio,
                image: image,
                onboarded: true,
            },
            { upsert: true }
        );
        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`failed to create/update user ${error.message}`);
    }
};
export const fetchUser = async(userId : string)=>{
    try {
        connectToDB();
        const user = User.findById({id:userId});
        return user;

    } catch (error:any) {
        throw new Error(`failed to fetch user data ${error.message}`);
    }
};