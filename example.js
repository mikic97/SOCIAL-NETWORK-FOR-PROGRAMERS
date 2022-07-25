const getPosts = () => {
  return new Promise((reslove, reject) => {
    let a = 5,
      b = 6;

    if (a > b) {
      reject("a nije vece od b");
    }

    reslove("a je vece od b");
  });
};

getPosts()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

const example = async () => {
  try {
    const data = await getPosts();
    return data;
  } catch (error) {
    console.log(error);
  }
};
