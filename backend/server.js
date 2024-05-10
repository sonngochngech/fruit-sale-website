const {server}=require("./app")


server.listen(8081, () => {
  console.log(`Server running on port  8081`);
});
module.exports={server}