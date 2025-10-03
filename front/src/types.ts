export interface IUser {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    picture: string | undefined;
};

export interface IComment {
    id: number;
    userId: number;
    postId: number;
    content: string;
}
export interface IPost {
    id: number;
    picture: string;
    userId: string;
    content: string;
    title?: string;
    likes?: IAccount[];
    comments?: IComment[];
    hashtags?: string[];
    isLiked?: boolean;
};

export interface IConnection {
    following: boolean;
    followsMe: boolean;
    requested: boolean;
    blockedMe: boolean;
    didIBlock: boolean;
};

export type IAccount = Omit<IUser, "password"> & {
    posts: IPost[];
    cover: string | null;
    isPrivate: boolean;
    followers: IAccount[];
    following: IAccount[];
    connection: IConnection;
};

export type NewUser = Omit<IUser, 'id'>;
export type AuthUser = Pick<IUser, 'login' | 'password'>;

export interface LoginUpdate {
    password: string;
    newLogin: string;
};

export interface PasswordUpdate {
    oldPassword: string;
    newPassword: string;
};

export interface IResponse<T = unknown> {
    status: string
    message: string
    payload: T
};

export interface IContext {
    account: IAccount
    setAccount: (account: IAccount) => void
};