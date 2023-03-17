import { Chain, Subscription } from "./types";

export const getNotificationQuery = (userName: string) => {
  return `
    query getNotification {
        notificationsByUser(userName:"${userName}"){
          data {
            _id
            userName
            notice {
              collection
              price
              chain
              direction
            }
          }
        }
      }
      `;
};

export const createSubscriptionQuery = (
  userName: string,
  collection: string,
  price: number,
  direction: string,
  chain: Chain
) => {
  return `mutation CreateANotification {
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
};

export const updateSubscriptionsQuery = (id: string, userName: string, subscriptions: Subscription[]) => {
   let query = `mutation update {
        updateNotification(id:"${id}", data:{
          userName: "${userName}", notice: ${JSON.stringify(subscriptions)}
        }){
          userName
          notice {
            collection
            price
            chain
            direction
          }
        }
      }`
      query = query.replace(/\"collection\"/g,"collection")
      query = query.replace(/\"price\"/g, "price")
      query = query.replace(/\"chain\"/g, "chain")
      query = query.replace(/\"direction\"/g,"direction")
      console.log('the query', query)
      return query
}

export const getCollectionBids = `query GetCollectionBidsForProject($projectId: String!) {\n  getCollectionBidsForProject(project_id: $projectId) {\n    bids {\n  price\n      fee\n      amount\n     }\n    __typename\n  }\n}`