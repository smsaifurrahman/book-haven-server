import { User } from "../user/user.model";

 const blockUserIntoDB = async (id: string) => {
  const result = await User.findOneAndUpdate({ _id: id }, {isBlocked: true}, {
    new: true,
  });
  return result;
};


export const AdminServices = {
  blockUserIntoDB
}