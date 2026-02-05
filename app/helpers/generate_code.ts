import { Op } from "sequelize";
import { Contacto } from "../models/Contacto.ts";
import { Denuncia } from "../models/Denuncia.ts";
import { Quejas } from "../models/Quejas.ts";

// Generate code for Contacto, Denuncia, Reclamo, Sugerencia
/**
 * Example: CEAR-CALL-2026-0001 -> Contacto
 *          CEAR-DEN-2026-0001  -> Denuncia
 *          CEAR-REC-2026-0001  -> Reclamo
 *          CEAR-SUG-2026-0001  -> Sugerencia
 */

/**
 * Generate code for Contacto, Denuncia, Reclamo, Sugerencia
 * @param type - Type of request: "Contacto", "Denuncia", "Reclamo", "Sugerencia"
 * @returns Generated code in format: CEAR-{TYPE}-{YEAR}-{NUMBER}
 */
export const generateRequestCode = async (type: "Contacto" | "Denuncia" | "Reclamo" | "Sugerencia"): Promise<string> => {
  const year = new Date().getFullYear();
  
  // Map types to code prefixes
  const typeMap: Record<string, string> = {
    "Contacto": "CALL",
    "Denuncia": "DEN",
    "Reclamo": "REC",
    "Sugerencia": "SUG"
  };

  const codePrefix = typeMap[type];
  if (!codePrefix) {
    throw new Error(`Tipo no válido: ${type}. Tipos válidos: Contacto, Denuncia, Reclamo, Sugerencia`);
  }

  const pattern = `CEAR-${codePrefix}-${year}-%`;

  // Query the appropriate model based on type
  let lastRecord;
  
  if (type === "Contacto") {
    lastRecord = await Contacto.findOne({
      where: {
        codigo: {
          [Op.like]: pattern,
        },
      },
      order: [["codigo", "DESC"]],
    });
  } else if (type === "Denuncia") {
    lastRecord = await Denuncia.findOne({
      where: {
        codigo: {
          [Op.like]: pattern,
        },
      },
      order: [["codigo", "DESC"]],
    });
  } else {
    // For Reclamo, Sugerencia - they are stored in Quejas model with tipo_queja
    lastRecord = await Quejas.findOne({
      where: {
        codigo: {
          [Op.like]: pattern,
        },
        tipo_queja: type,
      },
      order: [["codigo", "DESC"]],
    });
  }

  let number = 1;
  if (lastRecord && lastRecord.codigo) {
    // Extract number from code: CEAR-XXX-YYYY-NNNN
    const parts = lastRecord.codigo.split("-");
    const lastPart = parts[parts.length - 1];
    number = parseInt(lastPart) + 1;
  }

  return `CEAR-${codePrefix}-${year}-${number.toString().padStart(4, "0")}`;
};
