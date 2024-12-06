const strapi = require('@strapi/strapi');

const setupContentTypes = async () => {
  console.log('Initializing Strapi...');
  const app = strapi({ dir: process.cwd() });
  await app.start();

  console.log('Creating Content Types...');

  const contentTypes = [
    {
      name: 'Category',
      attributes: {
        name: { type: 'string', required: true },
        slug: { type: 'string', unique: true, required: true },
        description: { type: 'text' },
      },
    },
    {
      name: 'Author',
      attributes: {
        name: { type: 'string', required: true },
        email: { type: 'email', unique: true, required: true },
        bio: { type: 'text' },
        profilePicture: { type: 'media', multiple: false },
      },
    },
    {
      name: 'Article',
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'string', unique: true, required: true },
        content: { type: 'richtext' },
        publishedAt: { type: 'datetime' },
        author: { type: 'relation', target: 'Author', relation: 'manyToOne' },
        category: { type: 'relation', target: 'Category', relation: 'manyToOne' },
      },
    },
  ];

  for (const type of contentTypes) {
    console.log(`Creating content type: ${type.name}`);
    await app.contentType.create({ data: type });
  }

  console.log('Content Types created!');
  await app.stop();
};

setupContentTypes().catch((error) => {
  console.error('Error creating content types:', error);
});

