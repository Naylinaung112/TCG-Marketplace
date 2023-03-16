import axios from 'axios';

const apiKey = '87574e79-062f-48ae-ae3d-508c85fcfd08';

const api = 'https://api.pokemontcg.io/v2/';

export const getCard = async ({page, name}) => {
  try {
    const result = await axios.get(
      api +
        `cards?${name ? `q=name:${name}&&` : ''}pageSize=12&&page=${
          page ? page : 1
        }`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      },
    );
    return result.data;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
