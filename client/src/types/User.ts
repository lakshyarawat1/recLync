import { Tags } from "./Tags";

export type User = {
    id: string,
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    preferences: Tags[],
    wishlist: string,
    profileImage?: string,
}