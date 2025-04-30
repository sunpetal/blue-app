import axios from "axios";

const API_BASE_URL = "https://date.nager.at/api/v3";

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[] | null;
  launchYear?: number | null;
  type: string;
}

/**
 * Fetches public holidays for a given country and year.
 *
 * @param year - The year for which to fetch holidays.
 * @param countryCode - The country code (e.g., 'US' for the United States).
 * @returns A promise that resolves to an array of holidays.
 */
export const fetchHolidays = async (
  year: number,
  countryCode: string = "US",
): Promise<Holiday[]> => {
  try {
    const response = await axios.get<Holiday[]>(
      `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
