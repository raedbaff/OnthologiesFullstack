// api/controllers/PdfController.js
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

module.exports = {
  async generatePdf(req, res) {
    try {
      const templatePath = path.join(__dirname, '../../views/home.ejs');
      const templateContent = await ejs.renderFile(templatePath, { req });
      const pdfOptions = {
        format: 'Letter',
        orientation: 'portrait',
        border: '10mm',
      };

      pdf.create(templateContent, pdfOptions).toStream((err, stream) => {
        if (err) {
          return res.serverError(err);
        }

        res.header('Content-Disposition', 'attachment; filename="output.pdf"');
        res.type('application/pdf');
        stream.pipe(res);
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
