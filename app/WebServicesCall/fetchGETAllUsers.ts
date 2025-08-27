
export default async function fetchGETAllUsers() {
  try{
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    return data
  }catch (error) {
    console.log(error);
  }
}
