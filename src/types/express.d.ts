// src/types/express.d.ts
import { User } from '../../modules/user/user.model'; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user: User; // Add the user property to the Request interface
    }
  }
}
