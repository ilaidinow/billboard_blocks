const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  try {
    const blocksDir = path.join(__dirname, "../../blocks");
    const files = await fs.promises.readdir(blocksDir);

    const blocks = files
      .filter(file => file.endsWith(".png") && file.startsWith("block"))
      .map(file => {
        const match = file.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      })
      .filter(num => num !== null);

    return {
      statusCode: 200,
      body: JSON.stringify(blocks),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error reading blocks directory" }),
    };
  }
};
