import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <Toaster />
            {children}
        </ClerkProvider>
    );
}

export default PlatformLayout;
