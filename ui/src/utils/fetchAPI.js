import api from "../variables/api";
import axios from 'axios';

const getBlogById = (id) => {
  axios({
    url: api.graphql,
    method: 'post',
    data: {
      query: `query {
        blog(id: ${id}) {
            title
            intro
            text
            image {
              url
            }
            categories {
                id
                name
                color
            }
        }
      }`
    }
  });
}

export {
  getBlogById
}

