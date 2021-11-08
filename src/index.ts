import app from "./app";
const port = 8080;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
