import { User } from "../user/user.model";

 const blockUserIntoDB = async (id: string) => {
  console.log('from block', id);
  const result = await User.findOneAndUpdate({ _id: id }, {isBlocked: true}, {
    new: true,
  });
  return result;
};


export const AdminServices = {
  blockUserIntoDB
}