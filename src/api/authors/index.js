import Express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorRouter = Express.Router();
// console.log("the path is", dirname(fileURLToPath(import.meta.url)));
const authorJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
// console.log("path", authorJSONPath);

authorRouter.get("/", (req, res) => {
  try {
    // res.send({ message: "Hello!" });
    const fileContent = fs.readFileSync(authorJSONPath);
    const authorArray = JSON.parse(fileContent);
    // console.log("authors", authorArray);
    res.send(authorArray);
  } catch (error) {
    console.log(error);
  }
});

authorRouter.post("/", (req, res) => {
  try {
    // console.log("body", req.body);
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
    const fileContent = fs.readFileSync(authorJSONPath);
    const authorArray = JSON.parse(fileContent);
    authorArray.push(newAuthor);
    fs.writeFileSync(authorJSONPath, JSON.stringify(authorArray));
    res.status(201).send({ id: newAuthor.id });

    // res.send({ message: "Hello!" });
  } catch (error) {
    console.log(error);
  }
});
export default authorRouter;
