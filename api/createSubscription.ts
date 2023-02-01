import { queryFauna } from "../helpers/helpers";
import { createSubscriptionQuery, getNotificationQuery, updateSubscriptionsQuery } from "../helpers/queries";
import { Chain } from "../helpers/types";

export const createSubscription = async (
  userName: string,
  collection: string,
  price: number,
  direction: string,
  chain: Chain
) => {
  if (!userName || !collection || !price || !direction || price < 0) {
    return {
      content: `<@${userName}>, you provided invalid or missing fields. Please try again.`
    };
  }
  let query = getNotificationQuery(userName)
  let res = await queryFauna(query, {})

  if (res.data.notificationsByUser.data.length === 1) {
    const data = res.data.notificationsByUser.data[0]
    const notifications = data.notice
    notifications.push({
      collection: collection,
      price: price,
      chain: chain,
      direction: direction,
    })

    query = updateSubscriptionsQuery(data._id, data.userName, notifications)
    res = await queryFauna(query, {});
  } else {
    query = createSubscriptionQuery(userName, collection, price, direction, chain);
    res = await queryFauna(query, {});  
  }
  return {
    content: `<@${userName}>, we'll let you know when ${collection} is ${direction} your requested floor price of ${price}`,
  };
};
