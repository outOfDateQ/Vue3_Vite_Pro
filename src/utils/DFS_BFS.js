const arr = [
  {
    id: 'JD001',
    name: '家电',
    children: [
      {
        id: 'JD001001',
        name: '电视机',
      },
      {
        id: 'JD001002',
        name: '洗衣机',
      },
    ],
  },
  {
    id: 'DN001',
    name: '电脑',
  },
  {
    id: 'FZ001',
    name: '服装',
    children: [
      {
        id: 'FZ001001',
        name: '外套',
      },
      {
        id: 'FZ001002',
        name: '裤子',
        children: [
          {
            id: 'FZ00100201',
            name: '喇叭裤',
          },
          {
            id: 'FZ00100202',
            name: '直筒裤',
          },
        ],
      },
      {
        id: 'FZ001003',
        name: '袜子',
      },
    ],
  },
]

// 深度优先遍历
function useDFS(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length > 0) {
      useDFS(data[i].children)
    }
    console.log(data[i].name)
  }
}

// useDFS(arr)

// 广度优先遍历
let temp = []
function useBFS(data) {
  temp = []
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].name)
    if (data[i].children && data[i].children.length > 0) {
      temp.push(...data[i].children)
    }
  }
  if (temp.length) {
    useBFS(temp)
  }
}

useBFS(arr)
