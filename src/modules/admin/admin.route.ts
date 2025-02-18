import express from 'express';
import auth from '../../app/middleware/auth';
import { AdminController } from './admin.controller';


const router = express.Router();
router.patch('/block-user/:userId', auth('admin'), AdminController.blockUser);


export const AdminRoutes = router;
