import { UnauthorizedError } from "../errors/unauthorized-error";
import { UserData } from "../middleware/authentication";

export const checkPermission = (requestUser: UserData, dbUserId: string) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === dbUserId) return;
  throw new UnauthorizedError("Not authorized to access this route");
};
