import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Form from "./form";
async function OrganizationIdPage() {
    const boards = await db.board.findMany();
    return (
        <div className="flex flex-col space-y-4">
            <Form />
            {boards.map((board) => (
                <div key={board.id}>{board.title}</div>
            ))}
        </div>
    );
}

export default OrganizationIdPage;
