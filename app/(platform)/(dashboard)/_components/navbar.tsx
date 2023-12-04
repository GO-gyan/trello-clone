import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
function Navbar() {
    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
                <Button variant="primary" size="sm" className="rounded-sm md:hidden block">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterSelectOrganizationUrl="/organization/:id"
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            },
                        },
                    }}
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    );
}

export default Navbar;
