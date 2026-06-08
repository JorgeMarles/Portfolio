import Ajv from "ajv";
import { parse } from "yaml";
import schema from "./rendercv-schema.json";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
  validateFormats: false
});
const validate = ajv.compile(schema);

export function validateRenderCvYaml(yamlString: string): { valid: boolean; errors: string[] } {
  try {
    const data = parse(yamlString);
    const valid = validate(data);

    if (!valid && validate.errors) {
      // Filter out union type noise - AJV reports ALL branches of anyOf/oneOf that fail
      // Only keep errors that are likely the "real" validation issues
      const filtered = validate.errors.filter((err) => {
        // Skip "must be string" errors from union type attempts
        if (err.message === "must be string") return false;

        // Skip "must have required property" errors for properties that don't belong to the intended type
        // These appear when AJV tries different union branches (e.g., trying ExperienceEntry schema on an EducationEntry)
        if (err.keyword === "required") {
          const missingProp = err.params?.missingProperty;
          // Common union noise: wrong entry type properties
          const unionNoise = ["label", "details", "name", "company", "position", "title", "authors", "bullet", "number", "reversed_number"];
          if (missingProp && unionNoise.includes(missingProp)) {
            // Check if the parent path suggests this is union noise
            if (err.instancePath?.includes("/sections/")) return false;
          }
        }

        // Skip "must match a schema in anyOf" at section level - this is a summary error, keep the specific ones
        if (err.keyword === "anyOf" && err.instancePath?.match(/\/sections\/\w+$/)) return false;

        // Skip "must be null" for highlights - these are from union branches
        if (err.message === "must be null" && err.instancePath?.includes("/highlights")) return false;

        return true;
      });

      // If we filtered everything out, it might actually be valid (union matched a later branch)
      // Or keep at least root-level errors
      const relevantErrors = filtered.length > 0 ? filtered : validate.errors.filter(err =>
        !err.instancePath || err.instancePath.split("/").length <= 2
      );

      const errors = relevantErrors.map((err) => {
        const path = err.instancePath || "/";
        const message = err.message || "Unknown error";
        const detail = err.keyword === "required"
          ? `${message} '${err.params?.missingProperty}'`
          : err.keyword === "additionalProperties"
          ? `${message} '${err.params?.additionalProperty}'`
          : message;
        return `${path}: ${detail}`;
      });

      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  } catch (error: any) {
    return { valid: false, errors: [`YAML parsing error: ${error.message}`] };
  }
}
