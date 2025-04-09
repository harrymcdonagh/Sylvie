import NextAuth from "next-auth";
import User from "@/models/users";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Ensure database connection
          await connectDB();
          console.log("Database connected successfully.");

          // Find user by email
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            console.error("User not found with email:", credentials?.email);
            throw new Error("Invalid email or password.");
          }

          // Validate password
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials?.email);
            throw new Error("Invalid email or password.");
          }

          console.log("User authenticated successfully:", user.email);
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        throw new Error("Failed to process JWT.");
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user = {
            email: token.email,
            name: token.name,
            image: token.picture,
          };
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw new Error("Failed to process session.");
      }
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
