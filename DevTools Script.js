let all_ = await Promise.all(allN.filter(a => `aweme,history`.split(',').every(b => a.request.url.includes(b))).map(a => new Promise(r => a.getContent(c => r(c)))))
all_ = all_.filter(a => !!a && a[0] == '{').map(a => JSON.parse(a))

allAL = all_.map(a => a.aweme_list).flat()

let endIndex = allAL.findIndex(a => a.author.nickname == '陈智强') + 1, startIndex = 0
allVD = allAL.slice(startIndex, endIndex)
let aD = all_.map(a => a.aweme_date).reduce((acc, d) => {
    Object.keys(d).map(k => {
        acc[k] = d[k]
    })
    return acc
}, {})