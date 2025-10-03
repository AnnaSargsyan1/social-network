import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/general/Signup.tsx";
import { Login } from "./pages/general/Login.tsx";
import { AddPost } from "./pages/auth/posts/AddPost.tsx";
import { Settings } from "./pages/auth/settings";
import { Profile } from "./pages/auth/user/Profile.tsx";
import { Layout } from "./pages/auth/Layout.tsx";
import { Search } from "./pages/auth/Search.tsx";
import { Account } from "./pages/auth/user/Account.tsx";
import { SinglePost } from "./pages/auth/posts/SinglePost.tsx";

export const router = createBrowserRouter([
    {
        path: "",
        element: <Signup />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "profile",
        element: <Layout />,    
        children: [
            { path: "", element: <Profile /> },
            { path: ":id", element: <Account />} ,
            { path: "add", element: <AddPost /> },
            { path: "settings", element: <Settings /> },
            { path: "search", element: <Search /> },
        ]
    },
    { 
        path: "/posts", 
        element: <Layout />,
        children: [
            { path: ":id", element: <SinglePost /> }
        ]
    }
])