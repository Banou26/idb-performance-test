import { openDB, deleteDB } from 'idb'

console.log('test')

const init = async () => {
  await deleteDB('test')
  const db =
    await openDB('test2', 1, {
      upgrade(db) {
        db.createObjectStore('chunks')
      }
    })

  const items = new Uint8Array(Array(100000).fill(undefined).map(() => Math.random() * 255))
  const items2 = new Uint8Array(Array(1000000).fill(undefined).map(() => Math.random() * 255))
  const items3 = new Uint8Array(Array(10000000).fill(undefined).map(() => Math.random() * 255))
  // const items4 = new Uint8Array(Array(100000000).fill(undefined).map(() => Math.random() * 255))

  {
    console.log('write 100000 * 100kb')
    console.time('write 100000 * 100kb')
    for (let i = 100000; i--; i) {
      db.put('chunks', items[i], i)
    }
    console.timeEnd('write 100000 * 100kb')
    console.time('read 100000 * 100kb')
    for (let i = 100000; i--; i) {
      db.get('chunks', i)
    }
    console.timeEnd('read 100000 * 100kb')
  }

  {
    console.log('10000 * 1000kb')
    console.time('write 10000 * 1000kb')
    for (let i = 10000; i--; i) {
      db.put('chunks', items2[i], i)
    }
    console.timeEnd('write 10000 * 1000kb')
    console.time('read 10000 * 1000kb')
    for (let i = 10000; i--; i) {
      db.get('chunks', i)
    }
    console.timeEnd('read 10000 * 1000kb')
  }

  {
    console.log('1000 * 10000kb')
    console.time('write 1000 * 10000kb')
    for (let i = 1000; i--; i) {
      db.put('chunks', items3[i], i)
    }
    console.timeEnd('write 1000 * 10000kb')
    console.time('read 1000 * 10000kb')
    for (let i = 1000; i--; i) {
      db.get('chunks', i)
    }
    console.timeEnd('read 1000 * 10000kb')
  }

  // {
  //   const items = new Uint8Array(Array(100000000).fill(undefined).map(() => Math.random() * 255))
  //   console.time('write 100 * 100000kb')
  //   for (let i = 100; i--; i) {
  //     db.put('chunks', items[i], i)
  //   }
  //   console.timeEnd('write 100 * 100000kb')
  //   console.time('read 100 * 100000kb')
  //   for (let i = 100; i--; i) {
  //     db.get('chunks', i)
  //   }
  //   console.timeEnd('read 100 * 100000kb')
  // }

  await deleteDB('test')
}

init()
