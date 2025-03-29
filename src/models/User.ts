import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    projectCount: {
      type: Number,
      default: 0,
    },
    accessToken: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Function to create or update a user
export async function createOrUpdateUser(userData: {
  userId: string;
  username: string;
  accessToken: string;
  image?: string;
  projectCount?: number; // Optional field for updating projectCount
}) {
  const { userId, username, accessToken, image, projectCount } = userData;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      // Update the existing user's fields
      existingUser.accessToken = accessToken;
      if (image) existingUser.image = image;
      if (projectCount !== undefined) existingUser.projectCount = projectCount;
      await existingUser.save();
      return existingUser;
    }

    // Create a new user if they don't exist
    const newUser = await User.create({
      userId,
      username,
      accessToken,
      image,
      projectCount: projectCount || 0, // Default projectCount to 0 if not provided
    });

    return newUser;
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw new Error('Failed to create or update user');
  }
}

export default User;