import connectToDatabase from '@/lib/mongodb';

import Recipe from '@/models/Recipe';

export default async function handler(req, res) {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const { q = '', page = 1, limit = 20 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const query = q ? { title: { $regex: q, $options: 'i' } } : {};

        const total = await Recipe.countDocuments(query);
        const recipes = await Recipe.find(query)
          .sort({ created_at: -1 }) // Sort by created_at descending
          .skip((pageNumber - 1) * limitNumber)
          .limit(limitNumber);

        const totalPages = Math.ceil(total / limitNumber);

        res.status(200).json({
          success: true,
          data: recipes,
          total,
          page: pageNumber,
          pages: totalPages,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
