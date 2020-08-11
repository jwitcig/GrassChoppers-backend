module.exports.listAnnouncements = ({ user_id }) => {
  console.log('finding announcements:', user_id)

  return [
    {
      announcement_id: 'rainy_day_discount',
      title: 'Rainy Day Discount',
      subtitle: `Since it's raining outside, here's a discount!`,
    }
  ]
}