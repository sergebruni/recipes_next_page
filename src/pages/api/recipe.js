import connectToDatabase from '@/lib/mongodb';

import Recipe from '@/models/Recipe';

export default async function handler(req, res) {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        // Get recipe by sid
        const { id } = req.query;
        const recipe = await Recipe
          .findOne({ sid: id })
          .lean();

        if (!recipe) {
          return res.status(404).json({ success: false, error: 'Recipe not found' });
        }

        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}