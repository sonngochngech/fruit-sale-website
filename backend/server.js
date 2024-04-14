const {app,server}=require("./app")


app.listen(8081, () => {
  console.log(`Server running on port  3000`);
});
// app.listen(8081, () => {
//   console.log(`Server running on port 8080`);
// });
  
module.exports={app,server}