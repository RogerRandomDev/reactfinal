import { sendRequest } from '../Utils/requests';

async function useGetUserProducts(userID) {
  const userProducts = await sendRequest('product/showUser', 'POST', {
    body: {
      userID,
    },
  });
  console.log(userProducts);
}

export default useGetUserProducts;
