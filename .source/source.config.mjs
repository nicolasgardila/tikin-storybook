// source.config.ts
import { defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      status: z.enum(["alpha", "beta", "stable"]).optional()
    })
  }
});
export {
  docs
};
