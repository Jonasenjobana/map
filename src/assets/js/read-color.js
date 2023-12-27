const fs = require('fs')
// 读颜色文件
new Array(14).fill(0).forEach(async (el, index) => {
  if (index >= 3) {
    const allFileContents = await fs.readFileSync(`./colors_${index}.txt`, 'utf8')
    let data = []
    allFileContents.split(/\r?\n/).forEach((line) => {
      let [value, rgba] = line.split(':')
      if (value / 1000 > 1) {
        value = value.slice(0, -3) + 'K+'
      }
      data.push({
        value,
        rgba,
      })
    })

    await fs.writeFileSync(`data_${index}.txt`, `export const DensityZoom${index} = ${JSON.stringify(data)}`, 'utf-8', (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('成功！')
      }
    })
  }
})
