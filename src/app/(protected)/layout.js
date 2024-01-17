import ProtectedContainer from "@/container/ProtectedContainer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const auth = await getServerSession(authOptions);
  const isLoggedIn = auth?.user?.name;
  return isLoggedIn ? (
    <ProtectedContainer>{children}</ProtectedContainer>
  ) : (
    redirect("/login")
  );
}
