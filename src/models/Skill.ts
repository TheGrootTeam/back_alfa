import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  skill: { type: String, index: true }
});

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
