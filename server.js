const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const showdown = require("showdown");

dotenv.config();
const server = express();
const port = process.env.PORT || 3000;
server.use(cors());
const notion = new Client({
  auth: process.env.NOTION_RCP_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

server.get("/rcp/", async function (req, res) {
  const rcpDb = await notion.databases.query({
    database_id: process.env.NOTION_RCP_DATABASE_ID,
  });
  res.send(rcpDb);
});

server.get("/rcp/:id", async function (req, res) {
  const notionHeadings = await notion.pages.retrieve({
    page_id: req.params.id,
  });

  /* const rcpContent = await notion.blocks.children.list({
    block_id: req.params.id,
    page_size: 100,
  }); */

  const n2mBlocks = await n2m.pageToMarkdown(req.params.id);
  const mdContent = n2m.toMarkdownString(n2mBlocks);
  const converter = new showdown.Converter();
  const content = converter.makeHtml(mdContent);
  const rcpData = {
    headings: notionHeadings,
    content: content,
  };
  res.send(rcpData);
});

server.listen(port);
