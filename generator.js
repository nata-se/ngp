const fs = require('fs')
const { getBroadcastEmails, getBroadcastEmailDetails } = require('./api')

async function generate() {
  const { items } = await getBroadcastEmails()

  const emailStats = await Promise.all(
    items.map(({ emailMessageId }) => getBroadcastEmailDetails(emailMessageId))
  )

  const sortedEmails = emailStats.sort((em1, em2) => em2.emailMessageId - em1.emailMessageId)

  const results = sortedEmails.map((email) => {
    return [
      email.emailMessageId,
      email.name,
      email.statistics.recipients,
      email.statistics.opens,
      email.statistics.clicks,
      email.statistics.unsubscribes,
      email.statistics.bounces,
    ].join(',')
  })

  const content = [
    'Email Message ID, Email Name, Recipients, Opens, Clicks, Unsubscribes, Bounces',
    ...results,
  ].join('\n')

  fs.writeFileSync('EmailReport.csv', content)
  console.log('Email info is ready and packed in EmailReport.csv')
}

module.exports = generate