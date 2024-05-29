import { google } from 'googleapis';
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const getAuthTokenSingleton = (() => {
  let authToken = null;
  return () => {
    if (!authToken) {
      const credential = JSON.parse(
        Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString(),
      );
      const auth = new google.auth.GoogleAuth({
        scopes: SCOPES,
        credentials: {
          client_email: credential.client_email,
          private_key: credential.private_key,
        },
      });
      authToken = auth.getClient();
    }
    return authToken;
  };
})();

/**
 * Get values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} auth The authentication credentials.
 * @param {string} sheetName The name of the sheet to get values from.
 * @return {object} The values from the spreadsheet.
 */
export async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res.data.values;
}

/**
 * Append values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to update.
 * @param {object} valueInputOption Value update options.
 * @param {object} insertDataOption Insert data options.
 * @param {object} values A 2d array of values to update.
 * @return {obj} spreadsheet information
 */
export async function appendValues({
  spreadsheetId,
  range,
  valueInputOption,
  insertDataOption,
  auth,
  values,
}) {
  try {
    const resource = {
      values,
    };
    //define input parameters for append
    const input = {
      spreadsheetId,
      range,
      valueInputOption,
      insertDataOption,
      resource,
      auth,
    };
    const result = await sheets.spreadsheets.values.append(input);
    return result;
  } catch (err) {
    // TODO (Developer) - Handle exception
    throw err;
  }
}
