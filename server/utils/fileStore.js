const fs = require('fs/promises');
const path = require('path');

const topicsFilePath = path.join(__dirname, '..', 'data', 'topics.json');

async function readTopics() {
  try {
    const raw = await fs.readFile(topicsFilePath, 'utf-8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error('Topic store is not an array');
    }

    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeTopics([]);
      return [];
    }

    throw error;
  }
}

async function writeTopics(topics) {
  const payload = JSON.stringify(topics, null, 2);
  await fs.writeFile(topicsFilePath, payload, 'utf-8');
}

module.exports = {
  readTopics,
  writeTopics,
  topicsFilePath,
};
