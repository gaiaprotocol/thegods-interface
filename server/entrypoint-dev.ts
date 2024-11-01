import { exists } from "https://deno.land/std@0.223.0/fs/mod.ts";
import { serveFile } from "https://deno.land/std@0.223.0/http/file_server.ts";
import { pages } from "./pages.ts";

Deno.serve(async (req) => {
  const basePath = Deno.cwd() + "/public";
  const path = new URL(req.url).pathname;
  const page = pages(path, true);
  if (page) {
    return new Response(page, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  const filePath = basePath + path;
  if (path !== "/" && await exists(filePath)) {
    return await serveFile(req, filePath);
  } else {
    return await serveFile(req, basePath + "/index-dev.html");
  }
});
