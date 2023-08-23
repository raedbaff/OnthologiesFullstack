const fs = require('fs-extra');
const FriendsService = require('../services/FriendsService');

module.exports = {
  addFriend: async function (req, res) {
    // Get the file from the request
    var file = req.file('photo');

    // Save the file in the "uploads" directory
    var filePath = file.path;
    var fileName = file.name;
    var dirname = 'uploads';

    // Create the "uploads" directory if it doesn't exist
    await fs.ensureDir(dirname);

    // Copy the file to the "uploads" directory
    try {
      await fs.copy(filePath, dirname + '/' + fileName);

      const { name, email } = req.body;

      // Call the FriendsService.insert() function with the extracted data and photo filename
      await FriendsService.insert(name, email, fileName);

      res.send({
        success: true,
        fileName: fileName,
      });
    } catch (err) {
      console.error(err);
      res.send({
        error: 'Failed to insert data with the uploaded photo.',
      });
    }
  },
};
