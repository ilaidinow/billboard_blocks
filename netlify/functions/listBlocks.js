import { neon } from '@netlify/neon';

const sql = neon(); // משתמש ב־NETLIFY_DATABASE_URL

export async function handler(event) {
  try {
    const { block_number, image_url, buyer_email } = JSON.parse(event.body);

    await sql`
      INSERT INTO blocks (block_number, image_url, buyer_email)
      VALUES (${block_number}, ${image_url}, ${buyer_email})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
