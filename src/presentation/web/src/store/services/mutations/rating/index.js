const CreateRating = {
    query: (query) => ({
      url: query.path,
      method: 'POST',
      body: query.data,
      formData: true,
    }),
  };
  
  export default CreateRating ;
  