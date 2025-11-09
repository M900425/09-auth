import { ReactNode } from "react";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";
interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <TanStackProvider>
      <AuthProvider> {children} </AuthProvider>
    </TanStackProvider>
  );
}
