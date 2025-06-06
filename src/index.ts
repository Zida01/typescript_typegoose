import mongoose from "mongoose";
import { UserModel } from "./models/user";
import { Certificate } from "crypto";
import { PostModel } from "./models/post";

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DEV", {});
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

const createUser = async () => {
  const createdata = await UserModel.create({
    Username: "mssssst",
    Jobs: [
      {
        JobName: "Software Engineer",
        JobDescription: "Develops software applications.",
      },
      {
        JobName: "Data Scientist",
        JobDescription: "Analyzes data to extract insights.",
      },
    ],
    // age: 30,
  });
  console.log("User created:", createdata);
};

const findUser = async () => {
  const queryData = await UserModel.find({
    Username: "emma",
    Jobs: {
      $elemMatch: { JobName: "Software Engineer" },
    },
  }).exec();
  if (queryData) {
    console.log(JSON.stringify(queryData, null, 2));
  } else {
    console.log("User not found");
  }
};

const createPosts = async () => {
  const finduserdata = await UserModel.findOne({ Username: "mist" }).exec();
  if (!finduserdata) return "error";

  await PostModel.create({
    PostName: "my new post Idea",
    PostTag: ["jobs", "entertainment", "food"],
    author: finduserdata._id,
  });
};

// const findPosts = async () => {
//     const findAllPost = await PostModel.find().exec()
//     if (!findAllPost) return "error"
//     console.log("All Posts: ", JSON.stringify(findAllPost, null, 2));

// }
const findAuthor = async () => {
  const findAllPost = await PostModel.find()
    .populate({ path: "author", select: "Username" })
    .exec();
  if (!findAllPost) return "error";
  console.log("All Posts: ", JSON.stringify(findAllPost, null, 2));
};

const updateuserdata = async () => {
  const updatedata = await UserModel.findOneAndUpdate(
    {
      Username: "mssssst",
    },
    { Email: "aaa" },{  runValidators: true }
    );
    if (!updatedata) return Error
    else {
        console.log("User updated successfully:", updateuserdata);
    }
};

run().then(() => {
  //createUser()
  findUser();
  createPosts();
  //findPosts();
    findAuthor();
    updateuserdata();
  console.log("Running findUseer function... ");
});
