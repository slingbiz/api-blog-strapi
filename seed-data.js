const strapiFactory = require('@strapi/strapi');

const seedData = async () => {
  console.log('Initializing Strapi...');

  // Proper initialization for Strapi v5
  const app = await strapiFactory().load(); // Ensure `.load()` is used correctly
  await app.start();

  console.log('Seeding data...');

  // Seed Categories
  const categories = [
    { name: 'Technology', slug: 'technology', description: 'Tech news and updates.' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Tips for better living.' },
  ];

  for (const category of categories) {
    await app.entityService.create('api::category.category', { data: category });
  }
  console.log('Categories seeded!');

  // Seed Authors
  const authors = [
    { name: 'Jane Doe', email: 'jane.doe@example.com', bio: 'Tech writer and enthusiast.' },
  ];

  for (const author of authors) {
    await app.entityService.create('api::author.author', { data: author });
  }
  console.log('Authors seeded!');

  // Seed Articles
  const articles = [
    {
      title: 'The Rise of AI',
      slug: 'rise-of-ai',
      content: 'Artificial Intelligence is transforming the world.',
      publishedAt: new Date(),
      category: 1, // Replace with dynamically fetched IDs if needed
      author: 1, // Replace with dynamically fetched IDs if needed
    },
  ];

  for (const article of articles) {
    await app.entityService.create('api::article.article', { data: article });
  }
  console.log('Articles seeded!');

  await app.stop();
};

(async () => {
  try {
    await seedData();
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Exit with error
  }
})();

