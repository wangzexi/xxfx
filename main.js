const fs = require('fs')

async function main() {
    const res = await fetch("http://unify.xmu.edu.cn/api/activity/MySignIn", {
        "headers": {
            "Host": "unify.xmu.edu.cn",
            "cookie": "deviceKey=52fa16ef-54bd-4fba-a8ec-220769731b4a; ASP.NET_SessionId=p4wwgz1a4p4bh5cthxxxx",
            "content-type": "application/x-www-form-urlencoded"
        },
        "body": "page=1&pageSize=100",
        "method": "POST"
    });

    const mySignIn = (await res.json()).data

    const arr = (mySignIn.filter((x) => x.State === '成功'))

    const output = arr.map((x) => `${x.BeginOn}\t${x.Address}\t${x.Hoster}\t${x.Name}`).join('\n')

    console.log(output)
    fs.writeFileSync('output.txt', output)
}

main()