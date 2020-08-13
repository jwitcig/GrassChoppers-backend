module.exports.listServices = payload => {
  console.log('finding services')

  return [
    {
      service_id: '12345678',
      title: 'Lawn Mowing',
      description: `We'll mow your lawn.`,
    },
    {
      service_id: '87654321',
      title: 'Snow Removal',
      description: `We'll remove snow & ice from your driveway and sidewalk.`,
    },
  ]
}