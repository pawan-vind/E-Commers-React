import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/constant"
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/OrderSlice"
import { XMarkIcon, EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"
import Pagination from "../../common/pagination"
function  AdminOrders() {
    const [page, setpage] = useState(1) 
    const [sort, setsort] = useState({})
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)
    const totalOrders = useSelector(selectTotalOrders)
    const [editableOrderId, seteditableOrderId] = useState(-1)

    const handlePage = (page) =>{
        setpage(page)
      }


      const handleShow = (item)=>{
        
      }

      const handleEdit = (item)=>{
        seteditableOrderId(item.id)
      }

      const handleOrderStatus = (e, order)=>{
        const updateOrder = {...order , status: e.target.value}
        dispatch(updateOrderAsync(updateOrder))
        seteditableOrderId(-1)
      }
      const handlePaymentStatus = (e, order)=>{
        const updateOrder = {...order , paymentStatus: e.target.value}
        dispatch(updateOrderAsync(updateOrder))
        seteditableOrderId(-1)
      }

      const handleSort = (sortOption)=>{
        const sort = { _sort: sortOption.sort, _order:sortOption.order}
        setsort(sort)
      }

 

      const chooseColor = (status)=>{
        switch(status){
            case 'pending' :
                 return `bg-purple-200 text-purple-600`
            case 'Dispatch' :
                 return `bg-yellow-200 text-yellow-600`
            case 'received' :
                 return `bg-yellow-200 text-green-600`
            case 'Deliver' :
                 return `bg-green-200 text-green-600`
            case 'cancle' :
                 return `bg-red-200 text-red-600`
        }
      }
      
      console.log(totalOrders)
      useEffect(()=> { 
        const pagination = {_page: page, _limit: ITEMS_PER_PAGE}
        dispatch(fetchAllOrdersAsync({sort, pagination}))
        handlePage(page)
      }, [dispatch, page, sort])

    return ( 
        <>
        <div className="overflow-x-auto">
  <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left" 
              onClick={e=>
              handleSort({sort:'id', order: sort?._order == 'asc' ? 'desc' : 'asc'})} >
                Order#  
                {sort._sort === 'id' && 
                (sort._order === 'asc' ? (
                <ArrowUpIcon className="w-4 h-4 inline
                "></ArrowUpIcon>
                ) : (
                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                ))}
                </th>
              <th className="py-3 px-6 text-left ">Items</th>
              <th className="py-3 px-6 text-left" 
              onClick={e=>
              handleSort({sort:'totalAmount', order: sort?._order == 'asc' ? 'desc' : 'asc'})} >
               Total Amount 
                {sort._sort === 'totalAmount' && 
                (sort._order === 'asc' ? (
                <ArrowUpIcon className="w-4 h-4 inline
                "></ArrowUpIcon>
                ) : (
                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                ))}
                </th>
              <th className="py-3 px-6 text-center">Shipping Address</th>
              <th className="py-3 px-6 text-center">Order Status</th>
              <th className="py-3 px-6 text-center">payment</th>
              <th className="py-3 px-6 text-center">payment Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
           {
            orders.map((order)=>(
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                    
                    </div>
                    <span className="font-medium">{order.id}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                {order.items.map((item)=>(
                    <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={item.product.thumbnail}
                      />
                    </div>
                    <span>{item.product.title} - {item.quantity} - {discountPrice(item.product)}</span>
                  </div>
                ))}  
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    ${order.totalAmount}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="">
                  <div>  <strong>{order.selectedAddress.name}</strong></div>
                     {order.selectedAddress.street} ,
                    <div>{order.selectedAddress.city} {order.selectedAddress.state} ,
                    {order.selectedAddress.pinCode} ,</div>
                    
                    {order.selectedAddress.phone}
                    
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                    {order.id == editableOrderId ? 
                     <select value={order.status} onChange={e => handleOrderStatus(e, order)}>
                     <option value="pending">pending</option>
                     <option value="Dispatch">Dispatch</option>
                     <option value="Deliver">Deliver</option>
                     <option value="cancle">cancle</option>
                   </select>
                     :
                     <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-x`}>
                    {order.status}
                  </span>
                      }
                  
                  
                </td>
                <td className="py-3 px-6 text-center">
                    
                     <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-x`}>
                    {order.paymentMethod}
                  </span>
                      
                </td>
                <td className="py-3 px-6 text-center">
                    {order.id == editableOrderId ? 
                     <select value={order.status} onChange={e => handlePaymentStatus(e, order)}>
                     <option value="pending">pending</option>
                     <option value="Received">Received</option>
                   </select>
                     :
                     <span className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-x`}>
                    {order.paymentStatus}
                  </span>
                      }
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-6 transform hover:text-purple-500 hover:scale-110">
                      <EyeIcon onClick={(e)=>handleShow(order)} className="w-6  h-6"></EyeIcon>
                    </div>
                    <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                     <PencilIcon onClick={(e)=>handleEdit(order)} className="w-6 h-6"></PencilIcon>
                    </div>
                    
                  </div>
                </td>
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Pagination 
  page={page} 
  setpage={setpage} 
  handlePage={handlePage} 
  totalItems={totalOrders}></Pagination>
</div>

        </>
     );
}

export default AdminOrders;