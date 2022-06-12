const fs = require('fs')
const request = require('request')
const reportGenerator = require('../generator')

const mockEmails = JSON.stringify({ 
    "items":[
        { 
            "emailMessageId":469,
            "name":"Fragile Webs"
        },
        {
            "emailMessageId":470,
            "name": "High-Dollar Ask"
        },
    ],
    "count":2
})

const emailDetails = {
    "469": JSON.stringify({"emailMessageId":469,"name":"Fragile Webs","variants":[{"emailMessageId":0,"emailMessageVariantId":490,"name":"Fragile Webs","subject":"Fragile Webs"},{"emailMessageId":0,"emailMessageVariantId":491,"name":"Life in the Balance","subject":"Life in the Balance"},{"emailMessageId":0,"emailMessageVariantId":492,"name":"Fragile Webs_Winner","subject":"Fragile Webs"}],"statistics":{"recipients":450,"opens":14,"clicks":2,"unsubscribes":1,"bounces":6}}),
    "470": JSON.stringify({"emailMessageId":470,"name":"High-Dollar Ask","variants":[{"emailMessageId":0,"emailMessageVariantId":493,"name":"High-Dollar Ask","subject":"Your Support is Important to Us...and to Them"}],"statistics":{"recipients":136,"opens":4,"clicks":0,"unsubscribes":0,"bounces":2}}),
}

const expectedOutput = `Email Message ID, Email Name, Recipients, Opens, Clicks, Unsubscribes, Bounces
470,High-Dollar Ask,136,4,0,0,2
469,Fragile Webs,450,14,2,1,6`



function getMessageID(detailedAPIPath) {
    const index1   = detailedAPIPath.indexOf('broadcastEmails') + 'broadcastEmails'.length + 1
    const leftPart = detailedAPIPath.substring(index1, detailedAPIPath.length - 1)
    const index2   = leftPart.indexOf('?')

    return leftPart.substring(0, index2)
}
// getting IDs out of the first request

request.get = function(path, req, callback) {
    // `/broadcastEmails/{}/$expand=statistics`

    if (path.endsWith('/broadcastEmails')) {
        callback(null, req, mockEmails)
    } else if (path.endsWith('$expand=statistics')) {
        const messageID = getMessageID(path)
        callback(null, req, emailDetails[messageID])
    }
}

it('Ensure correct output', async () => {
    await reportGenerator()

    const output = fs.readFileSync('EmailReport.csv').toString()
    
    expect(output).toBe(expectedOutput)
})