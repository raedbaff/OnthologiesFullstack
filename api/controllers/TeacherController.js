const fs = require('fs-extra');
const path = require('path');
const TeacherService = require('../services/TeacherService');

module.exports = {
  async createTeacher(req, res) {
    try {
      const { name } = req.body;

      if (!name || !req.file('photo')) {
        return res.badRequest('Name and photo are required.');
      }

      const uploadDir = path.resolve('./assets/uploads');

      const uploadedFiles = await req.file('photo').upload({
        maxBytes: 10000000,
        dirname: uploadDir,
      });

      if (uploadedFiles.length === 0) {
        return res.serverError('Failed to upload photo.');
      }

      const photoPath = uploadedFiles[0].fd;

      await TeacherService.createTeacher({ name, photo: photoPath });

      return res.status(200).json({ message: 'Added teacher successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
