module.exports.listAnnouncements = ({ user_id }) => {
  console.log('finding announcements:', user_id)

  if (user_id === 'jwitcig') {
    return [{
      announcement_id: 'rainy_day_discount',
      title: 'Rainy Day Discount',
      subtitle: `Since it's raining outside, here's a discount!`,
    }]
  } else if (user_id === 'test') {
    return [{
      announcement_id: 'new_customer_discount',
      title: 'New Customer Discount',
      subtitle: `Discounted products for 1 month!`,
    }]
  }
  return []
}