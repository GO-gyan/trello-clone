import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateListOrder } from "./schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;