import {Request, Response} from 'express';
import Announcement from '../models/Announcement';

interface AnnouncementData {
  teacherName?: string;
  subject?: string;
  content?: string;
}

class AnnouncementController {
    static async createAnnouncement(req: Request, res: Response): Promise<void>{
        try {
            const { teacherName, subject, content }: AnnouncementData = req.body;
            if (!teacherName || !subject || !content) {
                res.status(400).json({ 
                    error: 'All fields (teacherName, subject, content) are required' 
                });
            }
            const newAnnouncement = new Announcement({
                teacherName,
                subject,
                content
            });

            const savedAnnouncement = await newAnnouncement.save();

            res.status(201).json({
                message: 'Announcement created successfully',
                data: savedAnnouncement
            });

        } catch (error) {
            console.error('Error creating announcement:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getAllAnnouncements(req: Request, res: Response): Promise<void> {
        try {
            const announcements = await Announcement.find().sort({ createdAt: -1 });

            res.json({
            message: 'Announcements retrieved successfully',
            data: announcements
            });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getAnnouncementById(req: Request, res: Response): Promise<void> {
        try {
            const announcementId = req.params.id;
            if (!announcementId) {
                res.status(400).json({ 
                    error: 'Announcement ID is required' 
                });
            }

            const announcement = await Announcement.findById(announcementId);
            if (!announcement) {
                res.status(404).json({ 
                    error: 'Announcement not found' 
                });
            }

            res.json({
                message: 'Announcement retrieved successfully',
                data: announcement
            });
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async updateAnnouncement(req: Request, res: Response): Promise<void> {
        try {
            const announcementId = req.params.id;
            const { teacherName, subject, content }: AnnouncementData = req.body;

            if (!announcementId) {
                res.status(400).json({ 
                    error: 'Announcement ID is required' 
                });
            }

            const updateData: AnnouncementData = {};
            if (teacherName) updateData.teacherName = teacherName;
            if (subject) updateData.subject = subject;
            if (content) updateData.content = content;

            const updatedAnnouncement = await Announcement.findByIdAndUpdate(
                announcementId,
                updateData,
                { new: true }
            );

            if (!updatedAnnouncement) {
                res.status(404).json({ 
                    error: 'Announcement not found' 
                });
            }

            res.json({
                message: 'Announcement updated successfully',
                data: updatedAnnouncement
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async deleteAnnouncement(req: Request, res: Response): Promise<void> {
        try {
            const announcementId = req.params.id;
            if (!announcementId) {
                res.status(400).json({ 
                    error: 'Announcement ID is required' 
                });
            }

            const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
            if (!deletedAnnouncement) {
                res.status(404).json({ 
                    error: 'Announcement not found' 
                });
            }

            res.json({
                message: 'Announcement deleted successfully',
                data: deletedAnnouncement
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getAnnouncementsByTeacher (req: Request, res: Response): Promise<void> {
        try {
            const { teacherName } = req.params;

            const announcements = await Announcement
                .find({ teacherName: new RegExp(teacherName, 'i') })
                .sort({ createdAt: -1 });

            res.json({
                message: `Announcements by ${teacherName} retrieved successfully`,
                data: announcements
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getAnnouncementsBySubject(req: Request, res: Response): Promise<void> {
        try {
            const { subject } = req.params;

            const announcements = await Announcement
                .find({ subject: new RegExp(subject, 'i') })
                .sort({ createdAt: -1 });

            res.json({
                message: `Announcements for subject ${subject} retrieved successfully`,
                data: announcements
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            } 
        }
    }
}


export default AnnouncementController;