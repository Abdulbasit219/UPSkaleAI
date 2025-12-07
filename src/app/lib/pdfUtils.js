// lib/pdfUtils.js (create this file in your project)
const pdfParse = require('pdf-parse');

async function extractTextFromPDF(buffer) {
  try {
    console.log('📄 Extracting text from PDF...');
    const data = await pdfParse(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF appears to be empty or image-based');
    }
    
    console.log(`✅ Extracted ${data.text.length} characters from PDF`);
    return data.text.trim();
  } catch (error) {
    console.error('❌ PDF extraction error:', error.message);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

module.exports = { extractTextFromPDF };