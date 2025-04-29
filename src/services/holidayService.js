import axios from "axios";

const API_BASE_URL = "https://date.nager.at/api/v3";

/**
 * Fetches public holidays for a given country and year.
 *
 * @param {number} year - The year for which to fetch holidays.
 * @param {string} countryCode - The country code (e.g., 'US' for the United States).
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
export const fetchHolidays = async (year, countryCode = "US") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
