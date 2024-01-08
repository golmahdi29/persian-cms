import Products from "./Components/Products/Products";
import Comments from "./Components/Comments/Comments";
import Users from './Components/Users/Users'
import Offers from './Components/Offers/Offers'
import Orders from './Components/Orders/Orders'

const routes = [
    { path: '/', element: <Products /> },
    { path: '/products', element: <Products /> },
    { path: '/comments', element: <Comments /> },
    { path: '/users', element: <Users /> },
    { path: '/orders', element: <Orders /> },
    { path: '/offers', element: <Offers /> },
]

export default routes