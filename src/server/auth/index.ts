// import NextAuth from "next-auth";
// import { cache } from "react";

// import { authConfig } from "./config";

// const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// const auth = cache(uncachedAuth);

// export { auth, handlers, signIn, signOut };

import NextAuth from "next-auth";
// import { cache } from "react";

import { authConfig } from "./config";

const { handlers, signIn, signOut, auth } = NextAuth(authConfig);


export { auth, handlers, signIn, signOut };

