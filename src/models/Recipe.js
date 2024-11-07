import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true },
  title: { type: String, required: true, maxlength: 100 },
  image: { type: String, required: true },
  created_by: { type: String, required: true },
  created_at: { type: Date, required: true },
  information: { type: String, required: true, maxlength: 1000 },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  tags: { type: [String], required: true },
  source_updated_at: { type: Date, required: true },
  record_created_at: { type: Date, required: true },
  record_updated_at: { type: Date, required: true },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
