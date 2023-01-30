import { queryFauna } from "../helpers/helpers";

export const createSubscription = async (
  userName: string,
  collection: string,
  price: number,
  direction: string,
  chain: string
) => {
  if (!userName || !collection || !price || !direction || price < 0) {
    return {
      content: `<@${userName}>, you provided invalid or missing fields. Please try again.`
    };
  }

  const query = `
  mutation CreateANotification {
    createNotification(
      data: {
        userName: "${userName}"
        notice: [{ collection: "${collection}", price: "${price.toString()}", direction: "${direction}", chain: "${chain}" }]
      }
    ) {
      notice {
        collection
        price
        direction
      }
    }
  }
    `;
  const res = await queryFauna(query, {});
  return {
    content: `<@${userName}>, we'll let you know when ${collection} is ${direction} your requested floor price of ${price}`
  };
};
