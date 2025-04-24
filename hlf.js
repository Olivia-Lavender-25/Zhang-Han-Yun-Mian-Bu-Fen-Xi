import splitFile from 'split-file'
import fs from 'fs'

let totalSize = 0

let ori_gitignore = fs.readFileSync('.gitignore').toString().split('\n')

function processDir(dir = './') {
  dir[dir.length - 1] != '/' && (dir = dir + '/')

  let f
  try {
    f = fs.readdirSync(dir).map(name => ({ name, path: dir + name, stat: !fs.lstatSync(dir + name).isSymbolicLink() && fs.statSync(dir + name) }))  
  } catch (error) {
    return
  }
  

  f.map((f) => {

    if (!f.stat) return
    if (f.stat.isFile()) {
      !f.name.includes('sf-part') && (totalSize += f.stat.size)

      if(ori_gitignore.includes(f.name.replaceAll(/[\[\]\(\)\!]/g, function (s) { return '\\' + s }))) return
      if (f.stat.size > 90000000) {
        console.log(f.name)
        splitFile.splitFileBySize(f.path, 90000000)
          .then((names) => {
            console.log(f.name, f.stat.size)
            fs.appendFileSync('./.gitignore', '\n' + f.name.replaceAll(/[\[\]\(\)\!]/g, function (s) { return '\\' + s }))
            // console.log(names);
            names.map(name => {
              fs.appendFileSync('./.gitignore', '\n' + name.replaceAll(/[\[\]\(\)\!]/g, function (s) { return '\\' + s }))
            })
          })
          .catch((err) => {
            console.log('Error: ', err);
          });
      }
    }
    if (f.stat.isDirectory()) {
      if(f.path == './.git') return 
      
      processDir(f.path)
    }
  })

}

let allFiles = [], allFolders = []
processDir()

console.log(totalSize)