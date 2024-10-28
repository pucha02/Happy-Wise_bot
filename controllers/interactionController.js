import UserInteraction from '../models/UserInteraction.js';

export const updateLastInteractionTime = async (chatId) => {
  try {
    const interaction = await UserInteraction.findOneAndUpdate(
      { chat_id: chatId },
      {
        last_interaction_time: new Date(),
        $setOnInsert: { initial_contact_time: new Date() },
      },
      { upsert: true, new: true }
    );
    console.log('Interaction time updated successfully:', interaction);
  } catch (error) {
    console.error('Error updating interaction time:', error);
  }
};