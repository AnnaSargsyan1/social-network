import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/general/Signup.tsx";
import { Login } from "./pages/general/Login.tsx";
import { Settings } from "./pages/auth/settings";
import { Profile } from "./pages/auth/user/Profile.tsx";
import { Layout } from "./pages/Layout.tsx";
import { Search } from "./pages/auth/Search.tsx";
import { Account } from "./pages/auth/user/Account.tsx";
import { SinglePost } from "./pages/auth/posts/SinglePost.tsx";

export const router = createBrowserRouter([
  {
    path: "/", // ✅ root must start with "/"
    element: <Layout />,
    children: [
      { index: true, element: <Signup /> }, // ✅ cleaner for default route
      { path: "login", element: <Login /> },
      {
        path: "posts",
        children: [
          { path: ":id", element: <SinglePost /> }
        ]
      },
      {
        path: "profile",
        children: [
          { index: true, element: <Profile /> },
          { path: ":id", element: <Account /> },
          { path: "settings", element: <Settings /> },
          { path: "search", element: <Search /> }
        ]
      }
    ]
  }
]);
