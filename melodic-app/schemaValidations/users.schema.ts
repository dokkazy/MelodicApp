import exp from "constants";
import z from "zod";

const Users = z.object({
    id: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
});

export type UsersListResType = z.TypeOf<typeof Users>
