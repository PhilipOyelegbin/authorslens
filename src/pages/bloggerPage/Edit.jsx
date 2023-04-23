const Edit = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // an arrow function for handling form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    // an async function to handle form posting
    const updateArticle = async() => {
      const formData = new FormData();
      formData.append("author", writer.author);
      formData.append("title", writer.title);
      formData.append("content", writer.content);
      formData.append("image", coverimage);

      try {
        const config = {header: {"Content-Type": "multipart/form-data"}}
        await axios.post("https://cumandra-api.herokuapp.com/create/", formData, config);
        setArticle(formData)
      } catch (error) {
        error?.message && setError("Unable to create article");
      } finally {
        setLoading(false);
      }
    };

    updateArticle();
  };

  return (
    <div>Edit</div>
  )
}

export default Edit