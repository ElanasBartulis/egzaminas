import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { postSchema } from "../utils/validations/postSchema.js";

export async function getAllPostsLoggedIn(req, res) {
  const allPosts = await postModel.findAll({
    include: [
      {
        model: userModel,
        attributes: ["email"],
      },
    ],
  });

  try {
    if (!allPosts) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(500).json("Something is wrong", error);
  }
}

export async function getAllPosts(req, res) {
  const allPosts = await postModel.findAll();

  try {
    if (!allPosts) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(500).json("Something is wrong", error);
  }
}

export async function getAllPostsByUserId(req, res) {
  const { id } = req.params;

  try {
    const allPostsById = await userModel.findByPk(id, {
      include: [{ model: postModel }],
    });

    if (!allPostsById) {
      return res
        .status(404)
        .json({ error: "No user or posts found for this user" });
    }
    res.status(200).json(allPostsById.posts);
  } catch (error) {
    res.status(500).json("Something is wrong", error);
  }
}

export async function createPost(req, res) {
  const { title, category, place, date } = req.body;

  try {
    const validationResult = postSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({ error: validationResult.error.issues });

    const userId = req.session.user.id;

    const newPost = await postModel.create({
      title,
      category,
      place,
      date,
    });

    // Paziureti del userId
    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).json("Something is wrong", error);
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  const findPost = await postModel.findByPk(id);

  try {
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    await postModel.update(updatedData, { where: { id } });

    const post = await postModel.findOne({ where: { id } });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Something is wrong", error);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const findPost = await postModel.findByPk(id);

  try {
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postModel.destroy({ where: { id } });
    res.status(200).json({ mesage: "Job deleted" });
  } catch (error) {
    res.status(500).json("Something went wrong: ", error);
  }
}

export async function getPostById(req, res) {
  const { id } = req.params;
  const findPost = await postModel.findByPk(id);

  try {
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(findPost);
  } catch (error) {
    res.status(500).json("Something went wrong: ", error);
  }
}