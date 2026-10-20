/*
  Google Apps Script untuk menyimpan RSVP dan ucapan ke Google Sheets.
  Petunjuk pemasangan ada di README.md.
*/
const SHEET_ID = "GANTI_DENGAN_ID_GOOGLE_SHEET_ANDA";

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Tamu");
  if (!sheet) throw new Error('Buat tab sheet bernama "Tamu".');
  const p = (e && e.parameter) ? e.parameter : {};
  const type = String(p.type || "");
  const name = String(p.name || "").slice(0, 100);
  const timestamp = String(p.timestamp || new Date().toISOString());

  if (!name || !["rsvp", "wish"].includes(type)) {
    return ContentService.createTextOutput("Invalid request");
  }

  if (type === "rsvp") {
    sheet.appendRow([timestamp, "RSVP", name, String(p.attendance || ""), String(p.guests || "1"), ""]);
  } else {
    const message = String(p.message || "").slice(0, 1000);
    sheet.appendRow([timestamp, "Ucapan", name, "", "", message]);
  }

  return ContentService.createTextOutput("OK");
}
