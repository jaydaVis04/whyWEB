const express = require('express');
const cors = require('cors');
const { readTopics, writeTopics } = require('./utils/fileStore');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const requiredFields = [
  'title',
  'category',
  'difficulty',
  'description',
  'whyItMatters',
  'status',
];
const allowedCategories = [
  'HTML',
  'CSS',
  'JavaScript',
  'Vue',
  'Backend',
  'APIs',
  'Databases',
  'Deployment',
  'UI Design',
];
const allowedDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
const allowedStatuses = ['Not Started', 'Learning', 'Completed'];

function normalizeTopicInput(payload = {}) {
  return {
    title: String(payload.title || '').trim(),
    category: String(payload.category || '').trim(),
    difficulty: String(payload.difficulty || '').trim(),
    description: String(payload.description || '').trim(),
    whyItMatters: String(payload.whyItMatters || '').trim(),
    status: String(payload.status || '').trim(),
    dateAdded: payload.dateAdded
      ? String(payload.dateAdded).trim()
      : new Date().toISOString().slice(0, 10),
  };
}

function validateTopic(topic) {
  const missingFields = requiredFields.filter((field) => !topic[field]);

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  if (!allowedCategories.includes(topic.category)) {
    return `Category must be one of: ${allowedCategories.join(', ')}`;
  }

  if (!allowedDifficulties.includes(topic.difficulty)) {
    return `Difficulty must be one of: ${allowedDifficulties.join(', ')}`;
  }

  if (!allowedStatuses.includes(topic.status)) {
    return `Status must be one of: ${allowedStatuses.join(', ')}`;
  }

  return null;
}

function createTopicId(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `topic-${slug}-${Date.now()}`;
}

app.get('/api/topics', async (_request, response) => {
  try {
    const topics = await readTopics();
    response.status(200).json(topics);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load topics.' });
  }
});

app.get('/api/topics/:id', async (request, response) => {
  try {
    const topics = await readTopics();
    const topic = topics.find((item) => item.id === request.params.id);

    if (!topic) {
      return response.status(404).json({ message: 'Topic not found.' });
    }

    response.status(200).json(topic);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load topic.' });
  }
});

app.post('/api/topics', async (request, response) => {
  try {
    const topics = await readTopics();
    const topic = normalizeTopicInput(request.body);
    const validationError = validateTopic(topic);

    if (validationError) {
      return response.status(400).json({ message: validationError });
    }

    const newTopic = {
      id: createTopicId(topic.title),
      ...topic,
    };

    topics.unshift(newTopic);
    await writeTopics(topics);

    response.status(201).json(newTopic);
  } catch (error) {
    response.status(500).json({ message: 'Failed to create topic.' });
  }
});

app.put('/api/topics/:id', async (request, response) => {
  try {
    const topics = await readTopics();
    const topicIndex = topics.findIndex((item) => item.id === request.params.id);

    if (topicIndex === -1) {
      return response.status(404).json({ message: 'Topic not found.' });
    }

    const updatedFields = normalizeTopicInput({
      ...topics[topicIndex],
      ...request.body,
      dateAdded: request.body.dateAdded || topics[topicIndex].dateAdded,
    });
    const validationError = validateTopic(updatedFields);

    if (validationError) {
      return response.status(400).json({ message: validationError });
    }

    const updatedTopic = {
      ...topics[topicIndex],
      ...updatedFields,
      id: topics[topicIndex].id,
    };

    topics[topicIndex] = updatedTopic;
    await writeTopics(topics);

    response.status(200).json(updatedTopic);
  } catch (error) {
    response.status(500).json({ message: 'Failed to update topic.' });
  }
});

app.delete('/api/topics/:id', async (request, response) => {
  try {
    const topics = await readTopics();
    const topicExists = topics.some((item) => item.id === request.params.id);

    if (!topicExists) {
      return response.status(404).json({ message: 'Topic not found.' });
    }

    const nextTopics = topics.filter((item) => item.id !== request.params.id);
    await writeTopics(nextTopics);

    response.status(200).json({ message: 'Topic deleted successfully.' });
  } catch (error) {
    response.status(500).json({ message: 'Failed to delete topic.' });
  }
});

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`whyWEB server running at http://localhost:${PORT}`);
});
