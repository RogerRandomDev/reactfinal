import { sendRequest } from '../Utils/requests';

async function useGetUserProducts(id) {
  const userProducts = await sendRequest('product/showUser', 'POST', {
    body: {
      id,
    },
  });
  console.log(userProducts);
}

export default useGetUserProducts;
