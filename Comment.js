class Comment {
  post_id = "";
  user_id = "";
  content = "";
  username = "";
  api_url = "https://62b05079e460b79df042dc6b.mockapi.io";

  create() {
    let data = {
      post_id: this.post_id,
      user_id: this.user_id,
      username: this.username,
      content: this.content,
    };

    data = JSON.stringify(data);

    fetch(`${this.api_url}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  async get(post_id) {
    let post_comments = [];

    try {
      let api_url = this.api_url + "/comments";

      const response = await fetch(api_url);
      const data = await response.json();

      console.log(data);

      data.forEach((item) => {
        if (item.post_id === post_id) {
          post_comments.push(item);
        }
      });
    } catch (error) {
      console.log(error);
    }

    return post_comments;
  }
}
