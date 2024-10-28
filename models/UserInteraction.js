import mongoose from 'mongoose';

const userInteractionSchema = new mongoose.Schema({
  full_name: { type: String },
  phone: { type: Number},
  chat_id: { type: Number, required: true, unique: true },
  initial_contact_time: { type: Date, default: Date.now },
  last_interaction_time: { type: Date, default: Date.now },
  interaction_type: { type: String }, // Поле для хранения типа взаимодействия (например, 'Зв'язатися із менеджером')
});

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

export default UserInteraction;
