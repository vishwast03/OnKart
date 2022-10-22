import Medusa from "@medusajs/medusa-js";

const MEDUSA_BACKEND_URL = "http://localhost:9000";

export const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL });
