// Đã sửa lỗi bộ sưu tập trang
export const fixedPages = [
  {
    id: 'search',
    name: 'Trang tìm kiếm',
    type: 'fixed'
  },
  {
    id: 'car',
    name: 'Giỏ hàng',
    type: 'fixed'
  },
  {
    id: 'my',
    name: 'của tôi',
    type: 'fixed'
  },
  {
    id: 'category',
    name: 'Thể loại',
    type: 'fixed'
  }
]

// Cấu hình điều hướng
export const navigation = {
  label: 'dẫn đường',
  styles: {
    background: '#fff'
  },
  list: [
    {
      id: '00001',
      icon: 'icon-shop',
      text: 'trang nhất',
      jump: {
        type: 'custom',
        id: '000000'
      }
    },
    {
      id: '00003',
      icon: 'icon-sort',
      text: 'Phân loại',
      jump: {
        type: 'fixed',
        id: 'category'
      }
    },
    {
      id: '00004',
      icon: 'icon-cart',
      text: 'Giỏ hàng',
      jump: {
        type: 'fixed',
        id: 'car'
      }
    },
    {
      id: '00005',
      icon: 'icon-my',
      text: 'của tôi',
      jump: {
        type: 'fixed',
        id: 'my'
      }
    }
  ]
}

// Cấu hình nhóm hàng hóa
export const goodsGroups = [
  {
    name: 'Sản phẩm mới nằm trên kệ',
    type: '0001',
    level: 1,
    child: []
  },
  {
    name: 'xếp hạng bán hàng',
    type: '0002',
    level: 1,
    child: []
  }
]

// Cấu hình mẫu danh sách sản phẩm
export const listTpl = {
  model: 'one',
  addIcon: 'cart'
}

// Cấu hình mẫu danh sách sản phẩm
export const categoryTpl = {
  advertising: false // Vị trí quảng cáo
}

// Cấu hình ban đầu của trung tâm thương mại
export const rojectModel = {
  name: '',
  cover:
    'https://i.niupic.com/images/2022/11/02/aaa2.jpeg',
  config: {
    navigation: navigation,
    goodsGroups: goodsGroups,
    listTpl: listTpl,
    categoryTpl: categoryTpl,
    hotList: [],
    backgroundColor: '#FFFFFF'
  },
  pages: [
    // Bộ sưu tập trang tùy chỉnh
    {
      id: '000000',
      name: 'trang nhất',
      home: true,
      componentList: []
    }
  ]
}
