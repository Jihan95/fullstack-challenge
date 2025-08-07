import express from 'express';
import AnnouncementController from '../controllers/announcementController';

const router = express.Router();

router.post('/', AnnouncementController.createAnnouncement);
router.get('/', AnnouncementController.getAllAnnouncements);
router.get('/:id', AnnouncementController.getAnnouncementById);
router.put('/:id', AnnouncementController.updateAnnouncement);
router.delete('/:id', AnnouncementController.deleteAnnouncement);

export default router;
